import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 博客文章列表页面，展示从API获取的文章数据
export default async function BlogPage() {
  // 从外部API获取博客文章数据
  // Next.js会自动缓存fetch请求结果（除非配置其他选项）
  const posts = (await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => {
      if (!res.ok) throw new Error("获取文章列表失败");
      return res.json();
    }
  )) as Post[];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              {post.body.substring(0, 150)}
              {post.body.length > 150 ? "..." : ""}
            </p>
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              阅读更多 &rarr;
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
