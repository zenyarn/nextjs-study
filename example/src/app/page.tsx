import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Next.js 学习示例</h1>
        <p className="text-xl text-gray-600">探索Next.js的核心功能</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link
          href="/about"
          className="group p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
            关于我们{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-gray-600">了解我们的团队和使命</p>
        </Link>

        <Link
          href="/products/featured"
          className="group p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
            精选产品{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-gray-600">浏览我们的精选产品系列</p>
        </Link>

        <Link
          href="/blog"
          className="group p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
            博客文章{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </h2>
          <p className="text-gray-600">阅读我们的最新文章和更新</p>
        </Link>

        <div className="group p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">更多示例即将推出...</h2>
          <p className="text-gray-600">敬请期待更多Next.js功能演示</p>
        </div>
      </div>
    </main>
  );
}
