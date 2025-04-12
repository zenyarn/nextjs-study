# Next.js 动态路由

动态路由允许你创建可以捕获不同路径参数的页面，非常适合构建基于数据的页面，如产品详情、用户资料等。

## 创建动态路由

使用方括号语法 `[param]` 定义动态路由段：

```
src/app/
└── products/
    └── [id]/          # 动态路由段
        └── page.tsx   # 对应 /products/1, /products/2 等
```

例如，`/products/[id]` 可以匹配 `/products/1`、`/products/2` 等路径。

## 访问路由参数

在页面组件中通过 `params` 属性访问动态参数：

```tsx
// src/app/products/[id]/page.tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  // params.id 包含了URL中的参数值
  return (
    <div>
      <h1>产品 ID: {params.id}</h1>
      {/* 产品详情内容 */}
    </div>
  );
}
```

重要提示：

- 路由参数总是以字符串形式传递
- 如果需要数字或其他类型，需要手动转换
- 参数名必须与目录名一致

## 多个动态段

可以在一个路径中包含多个动态路由段：

```
src/app/
└── blog/
    └── [category]/
        └── [slug]/
            └── page.tsx  # 对应 /blog/technology/nextjs-rocks 等
```

通过 `params` 访问多个参数：

```tsx
export default function BlogPost({
  params,
}: {
  params: { category: string; slug: string };
}) {
  // 访问 params.category 和 params.slug
  return (
    <div>
      <h1>分类: {params.category}</h1>
      <h2>文章: {params.slug}</h2>
      {/* 文章内容 */}
    </div>
  );
}
```

## 全捕获路由

使用三个点语法 `[...param]` 创建全捕获路由，可以匹配任意数量的路径段：

```
src/app/
└── docs/
    └── [...slug]/
        └── page.tsx  # 匹配 /docs/a, /docs/a/b, /docs/a/b/c 等
```

参数将作为数组传递：

```tsx
export default function DocsPage({ params }: { params: { slug: string[] } }) {
  // params.slug 是一个数组，例如 ['a', 'b', 'c']
  return (
    <div>
      <h1>文档路径: {params.slug.join("/")}</h1>
      {/* 文档内容 */}
    </div>
  );
}
```

## 可选全捕获路由

使用双方括号语法 `[[...param]]` 创建可选全捕获路由，可以匹配包括根路径在内的任意路径：

```
src/app/
└── shop/
    └── [[...categories]]/
        └── page.tsx  # 匹配 /shop, /shop/clothes, /shop/clothes/shirts 等
```

处理方式与全捕获类似，但需要考虑参数为空的情况：

```tsx
export default function ShopPage({
  params,
}: {
  params: { categories?: string[] };
}) {
  // 如果访问 /shop，params.categories 将是 undefined
  return (
    <div>
      <h1>商店</h1>
      {params.categories ? (
        <p>分类: {params.categories.join(" > ")}</p>
      ) : (
        <p>所有商品</p>
      )}
      {/* 商品列表 */}
    </div>
  );
}
```

## 最佳实践

- **类型安全**：使用 TypeScript 定义参数类型
- **参数验证**：确保动态参数有效，无效时使用`notFound()`
- **SEO 优化**：为动态页面生成元数据

```tsx
import { notFound } from "next/navigation";

// 验证产品ID并返回404页面
export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);

  // 验证ID是否有效
  if (isNaN(productId) || productId < 1) {
    notFound();
  }

  // 继续处理有效产品...
}
```

## 动态路由导航

使用模板字符串创建动态链接：

```tsx
import Link from "next/link";

// 产品列表组件
export default function ProductList() {
  return (
    <div>
      <h1>产品列表</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 相关概念

- [[RoutingBasics]] - 路由基础
- [[RouteHandlers]] - API 路由处理器
- [[NotFound]] - 404 页面
