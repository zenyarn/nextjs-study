import Link from "next/link";
import ProductsAPI from "./components/ProductsAPI";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center py-12 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-text-primary">
          Next.js 学习示例
        </h1>
        <p className="text-xl text-text-secondary">探索Next.js的核心功能</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-12">
        <Link
          href="/about"
          className="group p-6 bg-card shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2 text-text-primary group-hover:text-primary">
            关于我们{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-text-secondary">了解我们的团队和使命</p>
        </Link>

        <Link
          href="/products/featured"
          className="group p-6 bg-card shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2 text-text-primary group-hover:text-primary">
            精选产品{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-text-secondary">浏览我们的精选产品系列</p>
        </Link>

        <Link
          href="/blog"
          className="group p-6 bg-card shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2 text-text-primary group-hover:text-primary">
            博客文章{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-text-secondary">阅读我们的最新文章和更新</p>
        </Link>

        <div className="group p-6 bg-card shadow">
          <h2 className="text-2xl font-semibold mb-2 text-text-primary">
            更多示例即将推出...
          </h2>
          <p className="text-text-secondary">敬请期待更多Next.js功能演示</p>
        </div>
      </div>

      {/* API示例部分 */}
      <div className="w-full max-w-4xl bg-card shadow p-6 rounded">
        <h2 className="text-2xl font-semibold mb-4 text-text-primary">
          API端点演示
        </h2>
        <p className="text-text-secondary mb-6">
          下面是使用Next.js路由处理程序创建的API端点示例：
        </p>

        {/* 客户端组件，用于展示API调用 */}
        <ProductsAPI />

        <div className="mt-4 text-text-secondary text-sm">
          <p>API端点位于：</p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <code>/api/hello</code> - 简单的Hello World API
            </li>
            <li>
              <code>/api/products</code> - 产品API，支持GET和POST
            </li>
            <li>
              <code>/api/products/[id]</code> -
              单个产品API，支持GET、PUT和DELETE
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
