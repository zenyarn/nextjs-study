# Next.js 学习指南

本指南按照 Next.js 官方文档的组织结构，为学习 Next.js 提供了完整的路径。Next.js 是一个用于构建现代 Web 应用的全栈 React 框架，下面我们将系统地探索其所有核心功能和概念。

## 前置知识

- HTML, CSS 基础知识
- JavaScript 和 React 基础
- [React 基础知识准备](https://nextjs.org/learn/react-foundations)

## 第一部分：入门基础

### 快速开始

- [安装与项目创建](/NextJSNotes/GettingStarted/Installation.md)
- [项目结构和文件组织](/NextJSNotes/GettingStarted/ProjectStructure.md)
- [开发环境配置](/NextJSNotes/GettingStarted/Development.md)
- [编辑器设置](/NextJSNotes/GettingStarted/EditorSetup.md)

### Next.js 基础概念

- [Next.js 的核心理念](/NextJSNotes/Foundations/CoreConcepts.md)
- [从零到生产的工作流程](/NextJSNotes/Foundations/FromDevelopmentToProduction.md)
- [网络基础架构](/NextJSNotes/Foundations/WebFundamentals.md)
- [可访问性考量](/NextJSNotes/Foundations/Accessibility.md)

## 第二部分：路由系统 (App Router)

### App Router 入门

- [App Router 介绍](/NextJSNotes/AppRouter/Introduction.md)
- [从 Pages Router 迁移](/NextJSNotes/AppRouter/Migration.md)

### 路由基础

- [路由定义与基本约定](/NextJSNotes/AppRouter/Routing/Fundamentals.md)
- [页面与布局](/NextJSNotes/AppRouter/Routing/PagesAndLayouts.md)
- [链接与导航](/NextJSNotes/AppRouter/Routing/LinksNavigation.md)
- [路由组与组织方式](/NextJSNotes/AppRouter/Routing/RouteGroups.md)
- [动态路由](/NextJSNotes/AppRouter/Routing/DynamicRoutes.md)
- [加载状态与流式传输](/NextJSNotes/AppRouter/Routing/LoadingStates.md)
- [错误处理](/NextJSNotes/AppRouter/Routing/ErrorHandling.md)
- [并行与拦截路由](/NextJSNotes/AppRouter/Routing/ParallelRoutes.md)
- [中间件](/NextJSNotes/AppRouter/Routing/Middleware.md)
- [国际化](/NextJSNotes/AppRouter/Routing/Internationalization.md)

### 数据获取

- [数据获取基础](/NextJSNotes/AppRouter/DataFetching/Fundamentals.md)
- [数据获取模式](/NextJSNotes/AppRouter/DataFetching/Patterns.md)
- [缓存机制](/NextJSNotes/AppRouter/DataFetching/Caching.md)
- [服务器操作](/NextJSNotes/AppRouter/DataFetching/ServerActions.md)
- [数据重新验证](/NextJSNotes/AppRouter/DataFetching/Revalidation.md)

### 渲染

- [服务器组件与客户端组件](/NextJSNotes/AppRouter/Rendering/ServerClientComponents.md)
- [组合模式](/NextJSNotes/AppRouter/Rendering/CompositionPatterns.md)
- [Edge 与 Node.js 运行时](/NextJSNotes/AppRouter/Rendering/EdgeNode.md)

## 第三部分：构建应用

### 样式处理

- [CSS 模块](/NextJSNotes/Styling/CSSModules.md)
- [Tailwind CSS 集成](/NextJSNotes/Styling/TailwindCSS.md)
- [CSS-in-JS](/NextJSNotes/Styling/CSSinJS.md)
- [Sass 集成](/NextJSNotes/Styling/Sass.md)
- [PostCSS 配置](/NextJSNotes/Styling/PostCSS.md)

### 优化技术

- [图像优化](/NextJSNotes/Optimizing/Images.md)
- [字体优化](/NextJSNotes/Optimizing/Fonts.md)
- [脚本优化](/NextJSNotes/Optimizing/Scripts.md)
- [元数据和 SEO](/NextJSNotes/Optimizing/Metadata.md)
- [静态资源](/NextJSNotes/Optimizing/StaticAssets.md)
- [延迟加载](/NextJSNotes/Optimizing/LazyLoading.md)
- [分析应用性能](/NextJSNotes/Optimizing/Analytics.md)
- [OpenTelemetry](/NextJSNotes/Optimizing/OpenTelemetry.md)
- [Web Vitals](/NextJSNotes/Optimizing/WebVitals.md)

### API 路由

- [路由处理器](/NextJSNotes/APIRoutes/RouteHandlers.md)
- [中间件](/NextJSNotes/APIRoutes/Middleware.md)
- [响应类型](/NextJSNotes/APIRoutes/ResponseHelpers.md)
- [CORS 配置](/NextJSNotes/APIRoutes/CORS.md)
- [API 安全性](/NextJSNotes/APIRoutes/Security.md)

### 认证与授权

- [认证基础](/NextJSNotes/Authentication/Basics.md)
- [NextAuth.js 集成](/NextJSNotes/Authentication/NextAuth.md)
- [JWT 实现](/NextJSNotes/Authentication/JWT.md)
- [社交登录](/NextJSNotes/Authentication/SocialLogin.md)
- [权限控制](/NextJSNotes/Authentication/Authorization.md)

### 数据库集成

- [数据库连接模式](/NextJSNotes/Database/ConnectionPatterns.md)
- [ORM 集成](/NextJSNotes/Database/ORMIntegration.md)
- [SQL 数据库](/NextJSNotes/Database/SQLDatabases.md)
- [NoSQL 数据库](/NextJSNotes/Database/NoSQLDatabases.md)
- [Serverless 数据库](/NextJSNotes/Database/ServerlessDatabases.md)

## 第四部分：配置与部署

### 项目配置

- [TypeScript](/NextJSNotes/Configuring/TypeScript.md)
- [ESLint](/NextJSNotes/Configuring/ESLint.md)
- [环境变量](/NextJSNotes/Configuring/EnvironmentVariables.md)
- [绝对导入和模块路径别名](/NextJSNotes/Configuring/AbsoluteImports.md)
- [MDX](/NextJSNotes/Configuring/MDX.md)
- [src 目录](/NextJSNotes/Configuring/SrcDirectory.md)
- [草稿模式](/NextJSNotes/Configuring/DraftMode.md)
- [内容安全策略](/NextJSNotes/Configuring/CSP.md)

### 部署

- [构建与部署基础](/NextJSNotes/Deploying/Basics.md)
- [静态导出](/NextJSNotes/Deploying/StaticExports.md)
- [Node.js 服务器](/NextJSNotes/Deploying/NodeServer.md)
- [容器化部署](/NextJSNotes/Deploying/Containers.md)
- [CI/CD 集成](/NextJSNotes/Deploying/CICD.md)
- [Vercel 部署](/NextJSNotes/Deploying/Vercel.md)
- [其他云服务提供商](/NextJSNotes/Deploying/OtherProviders.md)

### 扩展性与性能

- [缓存策略](/NextJSNotes/Scaling/Caching.md)
- [负载均衡](/NextJSNotes/Scaling/LoadBalancing.md)
- [CDN 集成](/NextJSNotes/Scaling/CDN.md)
- [多区域部署](/NextJSNotes/Scaling/MultiRegion.md)
- [高可用性配置](/NextJSNotes/Scaling/HighAvailability.md)

## 第五部分：架构与高级主题

### Next.js 架构

- [Next.js 编译器](/NextJSNotes/Architecture/Compiler.md)
- [Turbopack](/NextJSNotes/Architecture/Turbopack.md)
- [渲染策略](/NextJSNotes/Architecture/RenderingStrategies.md)
- [Fast Refresh](/NextJSNotes/Architecture/FastRefresh.md)
- [Next.js 内部机制](/NextJSNotes/Architecture/HowNextWorks.md)

### 高级模式

- [微前端](/NextJSNotes/Advanced/Microfrontends.md)
- [服务器端组件高级模式](/NextJSNotes/Advanced/ServerComponentsAdvanced.md)
- [流式渲染](/NextJSNotes/Advanced/Streaming.md)
- [自定义服务器](/NextJSNotes/Advanced/CustomServer.md)
- [同构渲染](/NextJSNotes/Advanced/IsomorphicRendering.md)
- [AMP 支持](/NextJSNotes/Advanced/AMP.md)

### 测试与调试

- [测试策略](/NextJSNotes/Testing/Strategy.md)
- [单元测试](/NextJSNotes/Testing/UnitTesting.md)
- [集成测试](/NextJSNotes/Testing/IntegrationTesting.md)
- [端到端测试](/NextJSNotes/Testing/E2ETesting.md)
- [调试技巧](/NextJSNotes/Testing/Debugging.md)
- [性能测试](/NextJSNotes/Testing/PerformanceTesting.md)

## 第六部分：实用工具与资源

### API 参考

- [Next.js CLI](/NextJSNotes/API/CLI.md)
- [next.config.js](/NextJSNotes/API/NextConfig.md)
- [next/font](/NextJSNotes/API/NextFont.md)
- [next/image](/NextJSNotes/API/NextImage.md)
- [next/link](/NextJSNotes/API/NextLink.md)
- [next/script](/NextJSNotes/API/NextScript.md)
- [next/headers](/NextJSNotes/API/NextHeaders.md)
- [next/navigation](/NextJSNotes/API/NextNavigation.md)

### 社区与支持

- [社区与贡献](/NextJSNotes/Community/Contributing.md)
- [常见问题解答](/NextJSNotes/Community/FAQ.md)
- [支持渠道](/NextJSNotes/Community/Support.md)
- [示例与模板](/NextJSNotes/Community/Examples.md)
- [学习资源](/NextJSNotes/Community/Resources.md)

## 第七部分：实战项目

### 项目实践

- [博客系统构建](/NextJSNotes/Projects/Blog.md)
- [电子商务应用](/NextJSNotes/Projects/Ecommerce.md)
- [仪表盘应用](/NextJSNotes/Projects/Dashboard.md)
- [社交媒体应用](/NextJSNotes/Projects/SocialMedia.md)
- [实时应用](/NextJSNotes/Projects/RealtimeApp.md)

### 生产最佳实践

- [代码组织策略](/NextJSNotes/BestPractices/CodeOrganization.md)
- [错误处理](/NextJSNotes/BestPractices/ErrorHandling.md)
- [监控与日志](/NextJSNotes/BestPractices/MonitoringLogging.md)
- [安全最佳实践](/NextJSNotes/BestPractices/Security.md)
- [性能优化技巧](/NextJSNotes/BestPractices/Performance.md)
- [SEO 最佳实践](/NextJSNotes/BestPractices/SEO.md)
