import { NextRequest, NextResponse } from "next/server";

// 支持的语言列表
const LANGUAGES = ["en", "zh"];
const DEFAULT_LANGUAGE = "en";

// 从请求中获取首选语言
function getPreferredLanguage(request: NextRequest): string {
  // 首先尝试从cookie中获取
  const cookieLanguage = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLanguage && LANGUAGES.includes(cookieLanguage)) {
    return cookieLanguage;
  }

  // 再尝试从 Accept-Language 头部获取
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    // 简单解析Accept-Language头，例如：zh-CN,zh;q=0.9,en;q=0.8
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [code, weight] = lang.trim().split(";q=");
        return {
          code: code.split("-")[0], // 只取主要语言代码（zh-CN => zh）
          weight: weight ? parseFloat(weight) : 1.0,
        };
      })
      .sort((a, b) => b.weight - a.weight);

    // 查找支持的第一个语言
    for (const lang of languages) {
      if (LANGUAGES.includes(lang.code)) {
        return lang.code;
      }
    }
  }

  // 默认返回英语
  return DEFAULT_LANGUAGE;
}

// 中间件函数
export function middleware(request: NextRequest) {
  // 获取当前路径
  const { pathname } = request.nextUrl;

  // 检查路径是否已包含语言前缀
  const pathnameHasLanguage = LANGUAGES.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  // 如果已经有语言前缀，放行请求
  if (pathnameHasLanguage) {
    return NextResponse.next();
  }

  // 获取首选语言
  const language = getPreferredLanguage(request);

  // 只有about页面需要国际化处理
  if (pathname === "/about" || pathname === "/about/") {
    // 构建新的URL
    const newUrl = new URL(`/${language}${pathname}`, request.url);

    // 创建重定向响应
    const response = NextResponse.redirect(newUrl);

    // 设置语言cookie，保持用户语言偏好
    response.cookies.set("NEXT_LOCALE", language, {
      maxAge: 60 * 60 * 24 * 30, // 30天
      path: "/",
    });

    return response;
  }

  // 对于其他页面，不做处理
  return NextResponse.next();
}

// 配置中间件只应用于about页面
export const config = {
  matcher: ["/about", "/about/"],
};
