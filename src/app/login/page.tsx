"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Ghost } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) throw error;
        setMessage({ type: "success", text: "注册成功，请查收邮件确认链接" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "操作失败",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <Link href="/" className="flex items-center justify-center gap-2 text-white">
          <Ghost className="h-10 w-10" />
          <span className="text-2xl font-bold">OpenSoul</span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur-md">
          <h1 className="text-xl font-bold text-white">
            {isSignUp ? "注册" : "登录"}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {isSignUp ? "创建 OpenSoul 账户" : "登录到您的账户"}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                邮箱
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="••••••••"
              />
            </div>

            {message && (
              <p
                className={`text-sm ${
                  message.type === "success" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "处理中..." : isSignUp ? "注册" : "登录"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            {isSignUp ? "已有账户？" : "没有账户？"}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage(null);
              }}
              className="ml-1 font-medium text-white hover:underline"
            >
              {isSignUp ? "登录" : "注册"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-400">
            返回首页
          </Link>
        </p>
      </div>
    </main>
  );
}
