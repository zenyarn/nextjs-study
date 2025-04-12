# 路由处理程序 (Route Handlers)

Next.js 的路由处理程序允许你在 App Router 中创建自定义 API 端点，这些端点可以处理各种 HTTP 请求，并提供与同一项目前端无缝集成的后端功能。

## 基本概念

路由处理程序是 Next.js 中创建 API 端点的现代方式，它支持：

- 所有 HTTP 方法（GET、POST、PUT、PATCH、DELETE 等）
- Web 标准 API（Request 和 Response 对象）
- 动态路由参数
- 流式响应
- 表单数据处理

## 创建路由处理程序

### 基本结构

创建 API 端点的步骤：

1. 在`app`目录中创建一个目录（通常命名为`api`）
2. 在该目录中按照需要的路由结构创建子目录
3. 在任意目录中添加一个`route.js`或`route.ts`文件

例如：

```
app/
└── api/
    ├── products/
    │   ├── route.ts     # 处理 /api/products 的请求
    │   └── [id]/
    │       └── route.ts # 处理 /api/products/123 等动态路由
    └── users/
        └── route.ts     # 处理 /api/users 的请求
```

### 基本用法

一个简单的路由处理程序示例：

```typescript
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}
```

## HTTP 方法

路由处理程序支持所有标准的 HTTP 方法：

```typescript
export async function GET(request: Request) { ... }
export async function POST(request: Request) { ... }
export async function PUT(request: Request) { ... }
export async function PATCH(request: Request) { ... }
export async function DELETE(request: Request) { ... }
export async function HEAD(request: Request) { ... }
export async function OPTIONS(request: Request) { ... }
```

## 请求和响应处理

### 请求对象

路由处理程序接收标准的 Web Request 对象，还可以接收 Next.js 增强的 NextRequest 对象：

```typescript
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // 使用URL和搜索参数
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // 读取请求头
  const authHeader = request.headers.get("Authorization");

  // 其他NextRequest特性
  const cookieValue = request.cookies.get("cookieName")?.value;
  const geo = request.geo; // 地理位置信息
}
```

### 响应对象

响应可以使用标准的 Web Response 对象或 Next.js 的 NextResponse：

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  // 返回JSON响应
  return NextResponse.json({ data: "example" }, { status: 200 });

  // 或者使用标准Response
  return new Response(JSON.stringify({ data: "example" }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
```

### 重定向和重写

```typescript
export async function GET(request: NextRequest) {
  // 重定向
  return NextResponse.redirect(new URL("/new-page", request.url));

  // 重写
  return NextResponse.rewrite(new URL("/secret-page", request.url));
}
```

## 动态路由

动态路由遵循与页面相同的约定，使用方括号`[param]`语法：

```typescript
// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 注意：在最新版Next.js中，params是异步对象
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  return NextResponse.json({ id: productId });
}
```

## 数据验证与处理

### 请求体解析

```typescript
export async function POST(request: NextRequest) {
  try {
    // 解析JSON请求体
    const body = await request.json();

    // 基本验证
    if (!body.name) {
      return NextResponse.json({ error: "缺少必需的字段" }, { status: 400 });
    }

    // 处理请求...
  } catch (error) {
    return NextResponse.json({ error: "无效的请求数据" }, { status: 400 });
  }
}
```

### 表单数据

```typescript
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");

  // 处理表单数据...
}
```

## 缓存与重新验证

路由处理程序默认是动态的，但可以配置缓存行为：

```typescript
export const dynamic = "auto";
export const revalidate = 60; // 秒
```

## 路由段配置选项

可用配置选项：

```typescript
// 动态/静态确定
export const dynamic = 'auto' | 'force-dynamic' | 'error' | 'force-static';

// 重新验证
export const revalidate = false | 0 | number;

// 运行时选择
export const runtime = 'nodejs' | 'edge';

// 其他选项
export const preferredRegion = 'auto' | 'global' | 'home' | string | string[];
export const maxDuration = number;
```

## 错误处理最佳实践

```typescript
export async function GET() {
  try {
    // 获取数据或执行操作
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API错误:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
```

## 与数据库集成

路由处理程序可以直接连接数据库：

```typescript
import { db } from "@/lib/db";

export async function GET() {
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "数据库查询失败" }, { status: 500 });
  }
}
```

## 与前端集成

从前端调用 API 端点：

```typescript
// 在客户端组件中
"use client";

import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

  // 渲染产品...
}
```

## 相关概念

- [[ServerActions]] - 使用表单和服务器操作
- [[Middleware]] - 在路由处理程序之前处理请求
- [[DataFetchingFundamentals]] - 数据获取基础
