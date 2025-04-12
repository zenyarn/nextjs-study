# Next.js 安装与项目创建

创建一个新的 Next.js 项目非常简单，官方提供了便捷的脚手架工具。

## 环境准备

在开始之前，确保你的系统已安装：

- **Node.js 18.17** 或更高版本
- **npm**、**yarn** 或 **pnpm** 包管理器

可以通过以下命令检查 Node.js 版本：

```bash
node -v
```

## 使用 create-next-app 创建项目

Next.js 提供了官方脚手架工具 `create-next-app`，可以快速创建一个新项目：

```bash
npx create-next-app@latest my-next-app
# 或使用 yarn
yarn create next-app my-next-app
# 或使用 pnpm
pnpm create next-app my-next-app
```

> **注意**：项目名称不能包含大写字母，这是 npm 命名限制。

## 配置选项

在创建过程中，会提示你进行一些配置选择：

```
What is your project named? my-next-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
```

推荐的配置：

- 使用 TypeScript 提供类型安全
- 启用 ESLint 进行代码检查
- 使用 App Router (新的路由系统)

## 启动开发服务器

项目创建完成后，进入项目目录并启动开发服务器：

```bash
cd my-next-app
npm run dev
# 或使用 yarn
yarn dev
# 或使用 pnpm
pnpm dev
```

服务器默认运行在 http://localhost:3000

## 项目结构一览

基础项目结构及其主要文件：

```
my-next-app/
├── app/                 # 应用主目录 (使用 App Router)
│   ├── favicon.ico      # 网站图标
│   ├── globals.css      # 全局样式
│   ├── layout.js        # 根布局组件
│   └── page.js          # 首页组件
├── public/              # 静态资源目录
├── .eslintrc.json      # ESLint 配置
├── next.config.js      # Next.js 配置
├── package.json        # 项目依赖与脚本
└── README.md           # 项目说明文档
```

## 核心文件说明

- `app/page.js`: 首页组件，对应路由 `/`
- `app/layout.js`: 根布局组件，定义所有页面的共享结构
- `next.config.js`: Next.js 配置文件，可自定义构建行为
- `public/`: 存放静态资源，可通过 URL 直接访问

## 相关概念

- [[ProjectStructure]] - 项目结构详解
- [[AppRouter]] - App Router 路由系统
- [[Development]] - 开发环境配置
