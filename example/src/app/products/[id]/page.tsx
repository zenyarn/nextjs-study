import { notFound } from "next/navigation";
import Link from "next/link";

// 模拟产品数据 (实际应用中通常从数据库获取)
const products = [
  {
    id: 1,
    name: "高性能笔记本电脑",
    description: "16GB RAM, 512GB SSD, 15英寸显示屏",
    price: 7999,
    details:
      "这款高性能笔记本电脑配备最新一代处理器，提供卓越的性能和电池续航时间。轻薄的设计使其成为专业人士和学生的理想选择。",
  },
  {
    id: 2,
    name: "无线降噪耳机",
    description: "40小时续航，主动降噪，高清音质",
    price: 1299,
    details:
      "这款无线耳机采用先进的主动降噪技术，可有效阻隔外部环境噪音。配备高品质音频驱动器，提供沉浸式的音乐体验。长达40小时的电池续航，让您可以在长途旅行中尽情享受音乐。",
  },
  {
    id: 3,
    name: "智能手表",
    description: "心率监测，睡眠追踪，5ATM防水",
    price: 1599,
    details:
      "这款智能手表不仅能显示时间，还能监测您的健康状况。内置心率传感器和睡眠分析功能，帮助您保持健康的生活方式。5ATM防水设计使其适合各种活动场景。",
  },
  {
    id: 4,
    name: "4K智能电视",
    description: "55英寸，杜比视界，智能语音控制",
    price: 3499,
    details:
      "这款55英寸4K智能电视提供震撼的视觉体验，支持杜比视界和HDR内容。内置智能助手，您可以通过语音控制电视并搜索内容。丰富的应用商店让您的娱乐选择更加多样化。",
  },
  {
    id: 5,
    name: "便携式蓝牙音箱",
    description: "防水设计，24小时播放，双重低音",
    price: 399,
    details:
      "这款便携式蓝牙音箱具有强大的音质和震撼的低音效果。防水设计让您可以在户外或浴室安心使用。一次充电可连续播放24小时，是户外活动的理想伴侣。",
  },
  {
    id: 6,
    name: "高清数码相机",
    description: "2400万像素，30倍光学变焦，4K视频",
    price: 4299,
    details:
      "这款数码相机配备2400万像素传感器和30倍光学变焦镜头，可以捕捉远距离和细节丰富的照片。支持4K视频录制，自动对焦快速准确，是摄影爱好者的理想选择。",
  },
];

// 产品详情页面组件
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // 先等待整个params对象
  const resolvedParams = await params;

  // 将URL参数转换为数字
  const productId = parseInt(resolvedParams.id);

  // 查找产品数据
  const product = products.find((p) => p.id === productId);

  // 如果产品不存在，返回404页面
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="max-w-4xl w-full">
        <Link
          href="/products/featured"
          className="text-blue-500 hover:text-blue-700 mb-6 inline-block"
        >
          ← 返回精选产品
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="bg-gray-200 md:w-1/3 h-64 md:h-auto flex items-center justify-center">
              <span className="text-gray-500 text-lg">[产品图片]</span>
            </div>
            <div className="p-8 md:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-blue-600 text-2xl font-medium mb-4">
                ¥{product.price}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <h2 className="text-xl font-semibold mb-3">产品详情</h2>
              <p className="text-gray-700 mb-6">{product.details}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                加入购物车
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
