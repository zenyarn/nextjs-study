# 数据获取基础

Next.js App Router 提供了强大的数据获取能力，与 React 的服务器组件紧密结合，实现高效且灵活的数据获取策略。

## 在服务器组件中获取数据

服务器组件是获取数据的理想场所，因为它们：

1. 直接在服务器上执行
2. 不会将获取逻辑暴露给客户端
3. 可以访问后端资源（数据库、API 密钥等）
4. 减少客户端 JavaScript 大小
5. 避免客户端瀑布式请求

### 使用标准 fetch API

Next.js 扩展了原生`fetch` API，添加了自动缓存和重新验证功能：

```tsx
// 在服务器组件中获取数据
export default async function PostsPage() {
  // fetch会被自动缓存
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );

  return (
    <div>
      <h1>博客文章</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 获取选项

Next.js 的`fetch`支持配置缓存和重新验证行为：

```tsx
// 禁用缓存 (与普通fetch API行为一致)
const response = await fetch("https://...", { cache: "no-store" });

// 设置数据重新验证时间（10秒后过期）
const response = await fetch("https://...", { next: { revalidate: 10 } });
```

## 缓存策略

Next.js 提供了三种缓存数据的方式：

### 1. 默认：持久缓存

默认情况下，`fetch`响应会被无限期缓存：

```tsx
// 这个请求结果会被自动持久缓存
const posts = await fetch("https://api.example.com/posts").then((res) =>
  res.json()
);
```

适用于：很少变化的静态数据（公司信息、UI 文本等）

### 2. 动态数据：禁用缓存

对于需要每次请求都重新获取的实时数据：

```tsx
// 每次请求都会重新获取
const weather = await fetch("https://api.weather.com/current", {
  cache: "no-store",
}).then((res) => res.json());
```

适用于：实时数据（股票价格、天气、用户特定内容等）

### 3. 定时重新验证：ISR

对于需要定期刷新的数据：

```tsx
// 每60秒重新验证一次
const products = await fetch("https://api.store.com/products", {
  next: { revalidate: 60 },
}).then((res) => res.json());
```

适用于：需要定期更新但不需要实时性的数据（产品目录、博客文章等）

## 高级技巧

### 1. 并行数据获取

在服务器组件中，可以并行获取数据避免请求瀑布：

```tsx
export default async function Dashboard() {
  // 并行发起多个请求
  const postsPromise = fetch("https://api.example.com/posts");
  const usersPromise = fetch("https://api.example.com/users");

  // 等待所有请求完成
  const [postsRes, usersRes] = await Promise.all([postsPromise, usersPromise]);

  const posts = await postsRes.json();
  const users = await usersRes.json();

  return <div>{/* 使用获取的数据渲染UI */}</div>;
}
```

### 2. 路由段缓存

Next.js 支持在路由段级别配置缓存行为：

```tsx
// app/products/layout.tsx
export const revalidate = 60; // 整个产品路由段每60秒重新验证一次
```

### 3. 按需重新验证

使用路由处理程序执行按需重新验证：

```tsx
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path); // 重新验证指定路径
  return Response.json({ revalidated: true, now: Date.now() });
}
```

## 处理加载和错误状态

Next.js 提供了特殊文件约定来处理加载和错误状态：

### 加载状态

创建`loading.tsx`文件在数据加载时显示加载界面：

```tsx
// app/posts/loading.tsx
export default function Loading() {
  return <div>加载中，请稍候...</div>;
}
```

### 错误处理

创建`error.tsx`捕获并显示错误：

```tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>出错了！</h2>
      <button onClick={() => reset()}>重试</button>
    </div>
  );
}
```

## 相关概念

- [[ServerComponents]] - 服务器组件基础知识
- [[FetchAPI]] - 深入了解 fetch API
- [[StreamingSSR]] - 流式服务端渲染
- [[DataCaching]] - 数据缓存策略详解
