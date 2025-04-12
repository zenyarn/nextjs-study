import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">精选产品</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <Link href={`/products/${product.id}`}>
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">[产品图片]</span>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-blue-600 font-medium">¥{product.price}</p>
                <div className="mt-4 text-blue-500 hover:text-blue-700">
                  查看详情 →
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// 模拟数据
const featuredProducts = [
  {
    id: 1,
    name: "高性能笔记本电脑",
    description: "16GB RAM, 512GB SSD, 15英寸显示屏",
    price: 7999,
  },
  {
    id: 2,
    name: "无线降噪耳机",
    description: "40小时续航，主动降噪，高清音质",
    price: 1299,
  },
  {
    id: 3,
    name: "智能手表",
    description: "心率监测，睡眠追踪，5ATM防水",
    price: 1599,
  },
  {
    id: 4,
    name: "4K智能电视",
    description: "55英寸，杜比视界，智能语音控制",
    price: 3499,
  },
  {
    id: 5,
    name: "便携式蓝牙音箱",
    description: "防水设计，24小时播放，双重低音",
    price: 399,
  },
  {
    id: 6,
    name: "高清数码相机",
    description: "2400万像素，30倍光学变焦，4K视频",
    price: 4299,
  },
];
