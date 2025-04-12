export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">关于我们</h1>
      <div className="max-w-2xl text-center">
        <p className="mb-4">
          这是一个用Next.js构建的示例网站，用于学习Next.js的基本概念和功能。
        </p>
        <p className="mb-4">
          Next.js是一个用于构建现代Web应用程序的React框架，提供了服务器端渲染、静态站点生成、API路由等强大功能。
        </p>
        <p>
          通过本项目，我们将系统地学习Next.js的各个方面，包括路由系统、数据获取、样式处理和优化技术。
        </p>
      </div>
    </div>
  );
}
