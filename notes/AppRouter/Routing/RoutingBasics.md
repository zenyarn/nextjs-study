# Next.js 路由基础

Next.js 的 App Router 采用基于文件系统的路由方式，通过目录结构和特殊文件来定义应用的路由。

## 基于文件系统的路由

路由的基本工作原理：

- 文件夹用于定义路由
- 文件用于创建 UI
- 特殊文件名定义路由行为

## 路由段与嵌套路由

每个文件夹代表一个路由段，对应 URL 中的一个部分：

```
src/app/                   # 应用根目录
└── shop/                  # 对应 /shop
    └── products/          # 对应 /shop/products
        └── [productId]/   # 对应 /shop/products/123, /shop/products/456 等
```

## 创建页面

要创建一个可以公开访问的页面，需要在路由段目录中添加一个 `page.js` 或 `page.tsx` 文件：

```tsx
// src/app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>关于我们</h1>
      <p>这是一个关于页面</p>
    </div>
  );
}
```

这个文件定义了 `/about` 路由的内容。

## 页面组件规则

页面组件有几个重要特性：

- 始终是路由段的默认导出 (`export default`)
- 可以是服务器组件或客户端组件
- 不能直接接收从 URL 传来的参数（需用特殊钩子获取）
- 可以异步获取数据

## 特殊路由文件

App Router 中的特殊路由文件：

| 文件               | 作用                  |
| ------------------ | --------------------- |
| `page.js/tsx`      | 页面 UI，对应公开路由 |
| `layout.js/tsx`    | 共享布局              |
| `loading.js/tsx`   | 加载 UI               |
| `error.js/tsx`     | 错误 UI               |
| `not-found.js/tsx` | 404 UI                |
| `route.js/tsx`     | API 端点              |

## 导航方式

Next.js 提供两种导航方式：

### 1. `<Link>` 组件（推荐）

```tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">首页</Link>
      <Link href="/about">关于</Link>
      <Link href="/blog/post-1">博客文章</Link>
    </nav>
  );
}
```

### 2. `useRouter` 钩子（编程式导航）

```tsx
"use client";
import { useRouter } from "next/navigation";

export default function NavigationButton() {
  const router = useRouter();

  return <button onClick={() => router.push("/dashboard")}>前往仪表板</button>;
}
```

注意：`useRouter` 钩子只能在客户端组件中使用（需添加 `'use client'` 指令）。

## 路由组和私有文件夹

特殊的路由组织功能：

- 使用括号 `(folderName)` 创建组织性文件夹，不影响 URL 路径
- 使用下划线 `_folderName` 标记私有文件夹，防止作为路由

```
src/app/
├── (marketing)/       # 组织性文件夹，不影响URL
│   ├── about/
│   │   └── page.tsx   # 路由: /about
│   └── blog/
│       └── page.tsx   # 路由: /blog
└── _components/       # 私有文件夹，不作为路由
    └── Button.tsx
```

## 相关概念

- [[AppRouter]] - App Router 概述
- [[DynamicRoutes]] - 动态路由
- [[Layouts]] - 布局组件
- [[PageNavigation]] - 页面导航详解
