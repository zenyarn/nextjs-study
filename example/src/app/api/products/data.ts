// 产品类型定义
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  details?: string;
}

// 产品数据（模拟数据库）
let products: Product[] = [
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

// 获取产品数据
export function getProducts(): Product[] {
  return products;
}

// 更新产品数据
export function updateProducts(newProducts: Product[]): void {
  products = newProducts;
}

// 添加新产品
export function addProduct(product: Omit<Product, "id">): Product {
  // 生成新ID
  const newId = Math.max(...products.map((p) => p.id), 0) + 1;

  // 创建新产品
  const newProduct: Product = {
    id: newId,
    ...product,
  };

  // 添加到列表
  products.push(newProduct);

  return newProduct;
}

// 通过ID获取产品
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

// 删除产品
export function deleteProduct(id: number): boolean {
  const initialLength = products.length;
  products = products.filter((p) => p.id !== id);
  return products.length < initialLength;
}
