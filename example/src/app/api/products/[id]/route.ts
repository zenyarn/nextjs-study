import { NextRequest, NextResponse } from "next/server";

// 导入产品数据（实际项目中通常会从数据库获取）
import { Product, getProducts, getProductById, updateProducts } from "../data";

// 获取单个产品
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 从路径参数中获取产品ID
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "无效的产品ID" }, { status: 400 });
    }

    // 查找产品
    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json({ error: "产品不存在" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("获取产品详情时出错:", error);
    return NextResponse.json({ error: "获取产品详情失败" }, { status: 500 });
  }
}

// 更新单个产品
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 从路径参数中获取产品ID
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "无效的产品ID" }, { status: 400 });
    }

    // 获取当前产品列表
    const products = getProducts();
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({ error: "产品不存在" }, { status: 404 });
    }

    // 解析请求体中的JSON数据
    const updatedData = await request.json();

    // 更新产品数据
    const updatedProduct: Product = {
      ...products[productIndex],
      ...updatedData,
      id: productId, // 确保ID不变
    };

    // 更新产品列表
    products[productIndex] = updatedProduct;
    updateProducts(products);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("更新产品时出错:", error);
    return NextResponse.json({ error: "更新产品失败" }, { status: 500 });
  }
}

// 删除单个产品
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 从路径参数中获取产品ID
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "无效的产品ID" }, { status: 400 });
    }

    // 获取当前产品列表
    const products = getProducts();
    const initialLength = products.length;

    // 过滤掉要删除的产品
    const updatedProducts = products.filter((p) => p.id !== productId);

    // 检查是否找到并删除了产品
    if (updatedProducts.length === initialLength) {
      return NextResponse.json({ error: "产品不存在" }, { status: 404 });
    }

    // 更新产品列表
    updateProducts(updatedProducts);

    return NextResponse.json({ message: "产品已成功删除" });
  } catch (error) {
    console.error("删除产品时出错:", error);
    return NextResponse.json({ error: "删除产品失败" }, { status: 500 });
  }
}
