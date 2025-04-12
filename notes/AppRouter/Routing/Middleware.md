# Next.js 中间件（Middleware）

中间件是 Next.js 提供的一个强大功能，允许你在**页面或 API 路由被处理之前**运行代码。中间件可以通过修改请求或响应对象来实现各种功能，如路由重定向、添加响应头、验证请求等。

## 中间件的基本概念

### 什么是中间件

中间件是一段在服务器接收到请求后、但在路由处理程序或页面加载前执行的代码。它可以：

- 拦截和处理传入的请求
- 修改响应对象
- 重定向请求
- 重写 URL
- 添加自定义头部
- 检查身份验证状态

### 中间件执行顺序

在 Next.js 请求生命周期中，中间件是最先执行的代码之一：

1. 收到请求
2. **中间件执行**
3. 匹配路由
4. 渲染页面或处理 API 路由

## 创建中间件

### 基本结构

在项目根目录（与`pages`或`app`目录同级）创建一个`middleware.ts`（或`.js`）文件：

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 中间件逻辑
  return NextResponse.next();
}
```

### 响应类型

中间件函数可以返回以下几种响应：

- `NextResponse.next()` - 继续处理请求
- `NextResponse.redirect()` - 重定向到另一个 URL
- `NextResponse.rewrite()` - 内部重写 URL（对用户不可见）
- 不返回响应 - 相当于调用`NextResponse.next()`

### 修改响应

你可以通过设置自定义头部来修改响应：

```typescript
export function middleware(request: NextRequest) {
  // 使用next()返回带有修改的响应
  const response = NextResponse.next({
    headers: {
      "x-middleware-cache": "no-cache",
      "x-custom-header": "custom-value",
    },
  });

  return response;
}
```

### 匹配特定路径

使用`config`导出来指定中间件应用的路径：

```typescript
export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
```

或使用更复杂的匹配模式：

```typescript
export const config = {
  matcher: [
    /*
     * 匹配所有路径除了:
     * - 以 /api 开头的路径
     * - 以 /_next 开头的路径
     * - 静态文件如图片、字体等
     */
    "/((?!api|_next|.*\\.).*)",
  ],
};
```

## 常见应用场景

### 1. 身份验证与授权

保护特定路由，要求用户登录：

```typescript
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 检查是否为需要保护的路由
  if (path.startsWith("/dashboard") || path.startsWith("/profile")) {
    // 检查用户是否已登录
    const isAuthenticated = request.cookies.has("session-token");

    if (!isAuthenticated) {
      // 重定向到登录页面
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
```

### 2. 国际化路由

根据用户首选语言自动重定向：

```typescript
export function middleware(request: NextRequest) {
  // 获取用户首选语言
  const locale =
    request.cookies.get("NEXT_LOCALE")?.value ||
    request.headers.get("accept-language")?.split(",")[0].split("-")[0] ||
    "en";

  // 检查URL是否已包含语言前缀
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = ["/en", "/fr", "/de", "/zh"].some(
    (loc) => pathname.startsWith(loc) || pathname === "/"
  );

  // 如果URL没有语言前缀，添加用户首选语言
  if (!pathnameHasLocale) {
    const url = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
```

### 3. 添加安全头部

为所有响应添加安全相关的 HTTP 头部：

```typescript
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 添加安全头部
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // 针对HTML响应添加CSP
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.example.com;"
    );
  }

  return response;
}
```

### 4. A/B 测试

随机将用户分配到不同的实验组：

```typescript
export function middleware(request: NextRequest) {
  // 检查用户是否已分配实验组
  let group = request.cookies.get("ab-test-group")?.value;

  // 如果未分配，随机分配
  if (!group) {
    group = Math.random() > 0.5 ? "A" : "B";
    const response = NextResponse.next();

    // 设置cookie以保持一致性
    response.cookies.set("ab-test-group", group);

    return response;
  }

  // 根据实验组重写URL（内部）
  if (group === "B" && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/experiments/home-v2", request.url));
  }

  return NextResponse.next();
}
```

### 5. 维护模式

在系统维护期间重定向所有请求：

```typescript
export function middleware(request: NextRequest) {
  // 启用维护模式（实际应用中可能来自环境变量或数据库）
  const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";

  if (MAINTENANCE_MODE) {
    // 允许访问维护页面本身，避免无限重定向
    if (request.nextUrl.pathname === "/maintenance") {
      return NextResponse.next();
    }

    // 允许访问所需的静态资源
    if (
      request.nextUrl.pathname.startsWith("/_next/") ||
      request.nextUrl.pathname.startsWith("/images/")
    ) {
      return NextResponse.next();
    }

    // 其他所有请求重定向到维护页面
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}
```

## 中间件的限制

使用中间件时需要注意以下限制：

1. **Edge 运行时** - 中间件默认在 Edge 运行时执行，不能使用 Node.js API
2. **受限 Web API** - 只能使用部分 Web API
3. **计算时间限制** - 中间件执行时间有限制
4. **响应体处理** - 中间件不能访问或修改响应体
5. **大小限制** - 中间件代码大小有限制

## 最佳实践

1. **保持轻量** - 中间件应该简洁高效，避免复杂或耗时的操作
2. **精确匹配** - 使用 matcher 仅在必要的路径上运行中间件
3. **错误处理** - 添加适当的错误处理，避免中间件失败导致整个应用不可用
4. **缓存考虑** - 中间件可能影响缓存行为，需要谨慎设计
5. **调试** - 使用 console.log 记录中间件行为，帮助调试

## 相关概念

- [[RouteHandlers]] - 路由处理程序创建 API 端点
- [[ServerComponents]] - 服务器组件基础
- [[ServerActions]] - 服务器端表单处理和数据提交
