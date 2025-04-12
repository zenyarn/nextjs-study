# 服务器组件与客户端组件

Next.js App Router 引入了 React Server Components，这是一种全新的组件渲染模型，理解服务器组件和客户端组件的区别对于构建高效的应用至关重要。

## 基本概念

### 服务器组件 (Server Components)

服务器组件在服务器上渲染，不会发送到客户端：

- **默认行为**：在 App Router 中，所有组件默认都是服务器组件
- **无客户端交互**：不能使用浏览器 API 或 React 钩子（如 useState）
- **数据获取优势**：可以直接访问后端资源
- **安全性**：敏感信息（API 密钥等）不会发送到客户端

```tsx
// 默认为服务器组件
export default function ProductPage({ params }) {
  // 可以直接访问数据库或API
  // 没有 'use client' 指令

  return <div>...</div>;
}
```

### 客户端组件 (Client Components)

客户端组件在浏览器中渲染，提供交互功能：

- **显式声明**：通过在文件顶部添加 `'use client'` 指令来声明
- **支持交互**：可以使用 useState、useEffect 等 React 钩子
- **可访问浏览器 API**：如 window、document 等
- **交互性**：处理事件、状态和客户端交互

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>计数：{count}</button>;
}
```

## 选择策略

如何选择使用哪种组件？

**默认使用服务器组件**，除非需要：

- 使用客户端状态或生命周期钩子
- 使用浏览器专有 API
- 使用依赖这些功能的客户端事件

## 混合使用模式

一个常见的模式是将应用拆分为：

- 服务器组件处理数据获取和渲染主要内容
- 客户端组件处理交互和状态

```tsx
// 服务器组件
export default async function ProductPage({ params }) {
  // 获取产品数据
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* 引入客户端组件处理交互 */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// 另一个文件: AddToCartButton.tsx
("use client");

export default function AddToCartButton({ productId }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddToCart() {
    setIsLoading(true);
    await addToCart(productId);
    setIsLoading(false);
  }

  return (
    <button onClick={handleAddToCart} disabled={isLoading}>
      {isLoading ? "添加中..." : "加入购物车"}
    </button>
  );
}
```

## 与路由和导航的关系

服务器/客户端组件模型与导航和路由紧密相关：

### Link 组件

- **可在两种组件中使用**：服务器组件和客户端组件都可以使用 Link
- **预取优化**：自动预取链接页面的内容
- **客户端导航**：用户点击后在客户端进行页面切换

```tsx
// 在服务器组件中使用 Link
import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/products">所有产品</Link>
    </nav>
  );
}
```

### useRouter 钩子

- **仅限客户端组件**：只能在客户端组件中使用（需要'use client'）
- **编程式导航**：通过 JavaScript 代码触发导航
- **路由状态管理**：访问路由状态和参数

```tsx
"use client";

import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const success = await login();
    if (success) {
      router.push("/dashboard");
    }
  }

  return <form onSubmit={handleLogin}>...</form>;
}
```

## 最佳实践

### 数据获取

- **在服务器组件中获取数据**：减少客户端负担和网络请求
- **将数据作为属性传递给客户端组件**：避免重复请求

```tsx
// 服务器组件负责数据获取
export default async function UserProfile({ userId }) {
  const user = await fetchUser(userId);

  return <UserProfileClient user={user} />;
}

// 客户端组件负责交互
("use client");

export function UserProfileClient({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  // 不需要重新获取用户数据
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "取消" : "编辑"}
      </button>
      {isEditing && <EditForm user={user} />}
    </div>
  );
}
```

### 客户端组件边界

- **将客户端组件推到叶节点**：尽量减少客户端组件的范围
- **注意服务器组件导入客户端代码的方式**：
  - ✅ 可以：导入并渲染客户端 React 组件
  - ❌ 避免：导入客户端模块中的非组件导出（函数、常量等）

```tsx
// 正确：服务器组件导入并渲染客户端组件
// ServerComponent.tsx (服务器组件)
import ClientButton from "./ClientButton"; // ClientButton是一个'use client'组件

export default function ServerComponent() {
  return (
    <div>
      <h1>服务器渲染的内容</h1>
      <ClientButton /> {/* 正确：可以渲染客户端组件 */}
    </div>
  );
}

// 错误：服务器组件导入客户端模块中的非组件导出
// ServerComponent.tsx (服务器组件)
import { formatDate } from "./clientUtils"; // clientUtils.ts有'use client'指令

export default function ServerComponent() {
  return <div>{formatDate(new Date())}</div>; // 这会导致ServerComponent变成客户端组件
}
```

### 嵌套策略

- **客户端组件嵌套服务器组件**：客户端组件不能直接导入服务器组件，但可以通过 props 或 children 接收服务器组件
- **服务器组件嵌套客户端组件**：服务器组件可以直接导入和渲染客户端组件，而不会影响其服务器组件的特性

```tsx
// 服务器组件内嵌客户端组件
// page.tsx (服务器组件)
import ClientComponent from "./ClientComponent";

export default async function Page() {
  const data = await fetchData();

  return (
    <div>
      <h1>服务器渲染内容: {data.title}</h1>
      <ClientComponent data={data} /> {/* 正确：服务器组件渲染客户端组件 */}
    </div>
  );
}
```

## 性能考虑

服务器组件提供了显著的性能优势：

- **减少 JavaScript 传输大小**：服务器组件代码不会发送到客户端
- **避免瀑布式数据获取**：可以并行获取数据
- **直接访问后端资源**：无需额外的 API 层
- **更快的页面加载**：HTML 流式传输给客户端
- **SEO 优化**：内容在服务器渲染，对搜索引擎友好

## 相关概念

- [[AppRouter]] - Next.js App Router 系统
- [[DataFetching]] - Next.js 数据获取策略
- [[PageNavigation]] - 页面导航方式
- [[ClientComponents]] - 客户端组件详解
