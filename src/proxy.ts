import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * 匹配除以下路径外的所有请求：
     * - _next/static (静态文件)
     * - _next/image (图片优化)
     * - favicon.ico
     * - 静态资源 (svg, png, jpg 等)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
