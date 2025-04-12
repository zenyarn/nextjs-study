import Link from "next/link";

export default function ChineseAboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">关于我们</h1>

      <p className="mb-4">
        欢迎来到我们的公司！我们致力于为客户提供最优质的产品和服务。
      </p>

      <p className="mb-4">
        我们的团队由充满激情的个人组成，他们致力于追求卓越和创新。
      </p>

      <p className="mb-8">
        无论您是寻找前沿技术还是可靠的解决方案，我们都能满足您的需求。
      </p>

      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          返回首页
        </Link>
      </div>
    </div>
  );
}
