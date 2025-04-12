# Next.js 项目结构

Next.js 使用约定式文件结构，通过文件位置和命名来确定路由和功能。了解这些约定对有效开发至关重要。

## 基础项目结构

使用 `create-next-app` 创建新项目后，会生成以下基础结构：

```
my-next-app/
├── node_modules/        # 依赖包
├── public/              # 静态资源目录
├── src/                 # 源代码目录（可选）
│   └── app/             # App Router 目录
│       ├── favicon.ico  # 网站图标
│       ├── globals.css  # 全局样式
│       ├── layout.tsx   # 根布局组件
│       └── page.tsx     # 首页组件
├── .gitignore           # Git 忽略文件
├── next.config.ts       # Next.js 配置
├── package.json         # 项目依赖与脚本
├── tsconfig.json        # TypeScript 配置
└── README.md            # 项目说明文档
```

## 核心目录说明

### `/src` 目录 (可选)

源代码的可选根目录：

- 不是必需的，但推荐用于更清晰的代码组织
- 如果使用，所有应用代码应放在此目录下
- 配置文件仍保留在根目录

### `/src/app` 或 `/app` 目录

App Router 的根目录，采用基于文件系统的路由：

- 文件夹结构定义路由结构
- 特殊文件名确定组件类型和行为

### `/public` 目录

存放静态资源的目录：

- 图片、字体、图标等资源
- 这里的文件可以通过网站根路径直接访问
- 例如：`/public/logo.png` → `https://yourdomain.com/logo.png`

## 特殊文件约定

在 App Router 中，特定文件名具有特殊意义：

| 文件名             | 作用                             |
| ------------------ | -------------------------------- |
| `page.js/tsx`      | 页面组件，使路径可访问           |
| `layout.js/tsx`    | 布局组件，包裹其目录下的所有页面 |
| `loading.js/tsx`   | 加载状态组件，页面加载时显示     |
| `error.js/tsx`     | 错误处理组件，出错时显示         |
| `not-found.js/tsx` | 404 页面组件，找不到资源时显示   |
| `route.js/tsx`     | API 路由处理器                   |

## 路径组织示例

以下是如何通过文件系统创建路由的示例：

```
src/app/
├── page.tsx              # 路由: /
├── about/
│   └── page.tsx          # 路由: /about
├── blog/
│   ├── page.tsx          # 路由: /blog
│   └── [slug]/
│       └── page.tsx      # 路由: /blog/post-1, /blog/post-2 等
└── dashboard/
    ├── layout.tsx        # 仪表板布局，应用于所有仪表板页面
    ├── page.tsx          # 路由: /dashboard
    ├── settings/
    │   └── page.tsx      # 路由: /dashboard/settings
    └── analytics/
        └── page.tsx      # 路由: /dashboard/analytics
```

## 配置文件

Next.js 项目中的关键配置文件：

- **next.config.js/ts**: Next.js 核心配置
- **tsconfig.json**: TypeScript 配置
- **package.json**: 依赖和脚本
- **postcss.config.js**: PostCSS 配置（如使用 Tailwind）
- **eslint.config.js**: ESLint 配置

## 组织建议

随着项目增长，可以考虑以下组织方式：

- **/components**: 共享的 UI 组件
- **/lib** 或 **/utils**: 工具函数和助手
- **/hooks**: 自定义 React hooks
- **/types**: TypeScript 类型定义
- **/styles**: 样式文件
- **/context**: React 上下文和状态管理

## 相关概念

- [[AppRouter]] - Next.js 的 App Router 系统
- [[FileConventions]] - 文件命名约定
- [[RoutingBasics]] - 路由基础
- [[StaticAssets]] - 静态资源处理
