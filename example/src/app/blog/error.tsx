"use client";

import { useEffect } from "react";

// 错误处理组件
// 当fetch或数据处理出错时显示
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 错误记录到控制台
  useEffect(() => {
    console.error("博客页面发生错误:", error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">数据加载失败</h2>

        <p className="text-gray-600 mb-6">
          抱歉，加载博客数据时发生错误。这可能是暂时性问题或网络连接问题。
        </p>

        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重试
          </button>

          <div>
            <a href="/blog" className="text-blue-500 hover:text-blue-700">
              返回博客主页
            </a>
          </div>
        </div>

        {error.digest && (
          <p className="mt-6 text-sm text-gray-500">错误ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
