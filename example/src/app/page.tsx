import Link from "next/link";
import ProductsAPI from "./components/ProductsAPI";
import Image from "next/image";

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

      <div className="mt-40 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="/about"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            About{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn more about our company.
          </p>
        </Link>

        <Link
          href="/products/featured"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Featured Products{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Browse our featured products.
          </p>
        </Link>

        <Link
          href="/en/about"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            English About{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about us in English.
          </p>
        </Link>

        <Link
          href="/zh/about"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            中文关于页面{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            用中文了解我们公司。
          </p>
        </Link>
      </div>
    </div>
  );
}
