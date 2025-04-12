import Link from "next/link";
import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// 博客文章详情页面
export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  // 先解析参数
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id);

  // 如果不是有效ID，返回404
  if (isNaN(postId)) {
    notFound();
  }

  // 并行获取文章详情和文章评论
  // 使用不同的缓存策略:
  // - 文章详情: 每10秒重新验证
  // - 用户信息: 持久缓存(默认)
  // - 评论: 不缓存(每次请求都获取最新数据)
  const [postRes, commentsRes] = await Promise.all([
    // 文章详情 - 每10秒重新验证
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      next: { revalidate: 10 }, // 每10秒重新验证一次
    }),
    // 评论 - 不缓存
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      cache: "no-store", // 每次请求都获取最新数据
    }),
  ]);

  // 检查请求是否成功
  if (!postRes.ok) {
    throw new Error("获取文章详情失败");
  }

  const post = (await postRes.json()) as Post;

  // 在获取文章后，再获取作者信息
  // 作者信息使用默认缓存策略(持久缓存)
  const userRes = await fetch(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`
  );
  const user = (await userRes.json()) as User;

  // 处理评论
  const comments = (await commentsRes.json()) as Comment[];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link
        href="/blog"
        className="text-blue-500 hover:text-blue-700 mb-6 inline-block"
      >
        ← 返回博客列表
      </Link>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span className="mr-4">作者: {user.name}</span>
            <span>上次更新时间: {new Date().toLocaleString()}</span>
          </div>

          <div className="prose max-w-none">
            {post.body.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-8 border-t">
          <h2 className="text-xl font-bold mb-6">评论 ({comments.length})</h2>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded border">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{comment.name}</h3>
                  <span className="text-gray-500 text-sm">{comment.email}</span>
                </div>
                <p className="text-gray-700">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="mt-6 text-sm text-gray-500">
        <p>数据获取策略演示:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>文章内容: 每10秒重新验证 (ISR)</li>
          <li>作者信息: 持久缓存 (静态)</li>
          <li>评论: 不缓存，每次请求都获取最新数据 (动态)</li>
        </ul>
      </div>
    </div>
  );
}
