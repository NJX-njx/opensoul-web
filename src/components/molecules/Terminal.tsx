"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const commands = [
  { cmd: "git clone https://github.com/NJX-njx/opensoul.git", output: "" },
  { cmd: "cd opensoul", output: "" },
  { cmd: "pnpm install", output: "Installing dependencies..." },
  { cmd: "pnpm start", output: "OpenSoul is running on http://localhost:3000" },
];

export function Terminal() {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < commands.length ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("git clone https://github.com/NJX-njx/opensoul.git");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
          <div className="h-3 w-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-xs font-medium text-zinc-500">bash</div>
        <button
          onClick={copyToClipboard}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 font-mono text-sm">
        {commands.map((command, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: index <= step ? 1 : 0, y: index <= step ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className={cn("mb-2", index > step && "hidden")}
          >
            <div className="flex gap-2 text-zinc-300">
              <span className="text-purple-400">$</span>
              <span>{command.cmd}</span>
            </div>
            {command.output && index < step && (
              <div className="mt-1 text-zinc-500">{command.output}</div>
            )}
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="h-5 w-2 bg-zinc-500"
        />
      </div>
    </div>
  );
}
