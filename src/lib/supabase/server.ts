import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 创建用于 Server Component、Server Action、Route Handler 的 Supabase 服务端客户端
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component 中 setAll 可能被忽略，由 proxy 负责刷新 session
          }
        },
      },
    }
  );
}
