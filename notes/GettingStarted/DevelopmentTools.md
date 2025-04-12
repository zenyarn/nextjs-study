# Next.js 开发工具选项

在创建 Next.js 项目时，有两个与开发体验相关的重要选项：Turbopack 和导入别名。

## Turbopack

**"Would you like to use Turbopack for `next dev`?"**

Turbopack 是 Next.js 团队开发的新一代 JavaScript 打包工具：

- 由 Webpack 创建者 Tobias Koppers 设计，旨在成为 Webpack 的继任者
- 用 Rust 编写，比 Webpack 快 700 倍（在某些情况下）
- 主要用于加速开发服务器启动时间和热模块替换（HMR）
- 仅用于开发环境（`next dev`），不影响生产构建

```js
// 使用 Turbopack 启动开发服务器
next dev
```

**优点**：

- 开发服务器启动速度更快
- 文件修改后的刷新速度明显提升
- 内存占用更低

**缺点**：

- 目前仍处于 Beta 阶段
- 尚未支持所有 Next.js 功能和插件
- 可能遇到兼容性问题

> 注意：在 2023 年底，Turbopack 仍在开发中。对于生产项目，如果遇到问题可以随时切换回标准打包工具。

## 导入别名 (Import Alias)

**"Would you like to customize the import alias (`@/*` by default)?"**

导入别名允许使用简短的符号引用项目中的文件，而不必使用冗长的相对路径：

- 默认别名 `@/*` 映射到项目根目录或 `src/` 目录（如果使用）
- 可以自定义其他别名，如 `@components/*` 或 `@utils/*`

### 没有别名时的导入：

```jsx
// 深层嵌套组件导入其他组件
import Button from "../../../components/Button";
import { formatDate } from "../../../../utils/date";
```

### 使用默认别名：

```jsx
// 使用 @/ 别名从任何位置导入
import Button from "@/components/Button";
import { formatDate } from "@/utils/date";
```

**优点**：

- 简化导入路径，提高可读性
- 移动文件时不需要更新所有相对路径
- 避免难以阅读的 `../../../` 路径链

**配置**：
别名在 `tsconfig.json` 或 `jsconfig.json` 中定义：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 其他开发体验增强

除了这两个选项，Next.js 还提供了其他开发体验增强功能：

- **Fast Refresh**：保留组件状态的快速刷新
- **内置 TypeScript 支持**：无需额外配置
- **内置 ESLint 配置**：针对 Next.js 优化的代码检查

## 相关概念

- [[Installation]] - 项目安装指南
- [[ProjectStructure]] - 项目结构详解
- [[NextConfig]] - Next.js 配置文件选项
