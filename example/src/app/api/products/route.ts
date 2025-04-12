import { NextRequest, NextResponse } from "next/server";
import {
  getProducts,
  addProduct,
  getProductById,
  updateProducts,
} from "./data";

// 处理GET请求 - 获取所有产品或特定产品
export async function GET(request: NextRequest) {
  // 获取URL中的搜索参数
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  // 如果提供了ID，返回特定产品
  if (id) {
    const productId = parseInt(id);
    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json({ error: "产品不存在" }, { status: 404 });
    }

    return NextResponse.json(product);
  }

  // 否则返回所有产品
  return NextResponse.json(getProducts());
}

// 处理POST请求 - 创建新产品
export async function POST(request: NextRequest) {
  try {
    // 解析请求体中的JSON数据
    const productData = await request.json();

    // 基本验证
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { error: "产品名称和价格是必填项" },
        { status: 400 }
      );
    }

    // 创建新产品
    const newProduct = addProduct({
      name: productData.name,
      description: productData.description || "",
      price: productData.price,
      details: productData.details || "",
    });

    // 返回创建的产品和201状态码
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    // 处理错误情况
    console.error("创建产品时出错:", error);
    return NextResponse.json({ error: "创建产品失败" }, { status: 500 });
  }
}

// 处理PUT请求 - 更新产品
export async function PUT(request: NextRequest) {
  try {
    // 获取URL中的搜索参数
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "必须提供产品ID" }, { status: 400 });
    }

    const productId = parseInt(id);
    const products = getProducts();
    const productIndex = products.findIndex((p) => p.id === productId);

    // 检查产品是否存在
    if (productIndex === -1) {
      return NextResponse.json({ error: "产品不存在" }, { status: 404 });
    }

    // 解析请求体中的JSON数据
    const updatedData = await request.json();

    // 更新产品数据，保留原有字段
    products[productIndex] = {
      ...products[productIndex],
      ...updatedData,
      id: productId, // 确保ID不变
    };

    // 更新产品列表
    updateProducts(products);

    // 返回更新后的产品
    return NextResponse.json(products[productIndex]);
  } catch (error) {
    console.error("更新产品时出错:", error);
    return NextResponse.json({ error: "更新产品失败" }, { status: 500 });
  }
}

// 处理DELETE请求 - 删除产品
export async function DELETE(request: NextRequest) {
  // 获取URL中的搜索参数
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "必须提供产品ID" }, { status: 400 });
  }

  const productId = parseInt(id);
  const products = getProducts();
  const initialLength = products.length;

  // 从数组中过滤掉要删除的产品
  const updatedProducts = products.filter((p) => p.id !== productId);

  // 检查是否找到并删除了产品
  if (updatedProducts.length === initialLength) {
    return NextResponse.json({ error: "产品不存在" }, { status: 404 });
  }

  // 更新产品列表
  updateProducts(updatedProducts);

  // 返回成功消息
  return NextResponse.json({ message: "产品已成功删除" });
}
