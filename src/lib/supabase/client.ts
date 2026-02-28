import { createBrowserClient } from "@supabase/ssr";

/**
 * 创建用于 Client Component 的 Supabase 浏览器客户端
 * 仅在浏览器环境使用
 * 需在 .env.local 中配置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Copy .env.example to .env.local and fill in values from supabase.com/dashboard or supabase start."
    );
  }
  return createBrowserClient(url, key);
}
