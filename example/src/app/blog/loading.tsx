// 博客页面的加载状态
// 此文件会在数据获取期间自动显示
export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="h-8 w-48 bg-gray-200 animate-pulse mb-8 rounded"></div>

      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="h-6 bg-gray-200 animate-pulse w-3/4 mb-4 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse w-2/3 rounded"></div>
            </div>
            <div className="h-4 bg-gray-200 animate-pulse w-24 mt-4 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
