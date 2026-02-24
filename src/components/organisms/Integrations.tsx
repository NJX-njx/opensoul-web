"use client";

import { Container } from "@/components/atoms/Container";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Send, 
  MessageSquare, 
  Hash, 
  MessageCircleMore, 
  AppWindow, 
  Bot, 
  Music, 
  Lightbulb, 
  FileText, 
  Twitter, 
  Globe, 
  Mail, 
  Github 
} from "lucide-react";
import Link from "next/link";

const integrations = [
  { name: "WhatsApp", icon: MessageCircle, color: "text-green-500" },
  { name: "Telegram", icon: Send, color: "text-blue-400" },
  { name: "Discord", icon: MessageSquare, color: "text-indigo-500" },
  { name: "Slack", icon: Hash, color: "text-purple-500" },
  { name: "Signal", icon: MessageCircleMore, color: "text-blue-500" },
  { name: "iMessage", icon: AppWindow, color: "text-blue-600" },
  { name: "Claude", icon: Bot, color: "text-orange-400" },
  { name: "GPT", icon: Bot, color: "text-green-400" },
  { name: "Spotify", icon: Music, color: "text-green-500" },
  { name: "Hue", icon: Lightbulb, color: "text-blue-300" },
  { name: "Obsidian", icon: FileText, color: "text-purple-400" },
  { name: "Twitter", icon: Twitter, color: "text-sky-500" },
  { name: "Browser", icon: Globe, color: "text-blue-400" },
  { name: "Gmail", icon: Mail, color: "text-red-500" },
  { name: "GitHub", icon: Github, color: "text-white" },
];

export function Integrations() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl flex items-center gap-3">
            <span className="text-red-500">›</span> Works With Everything
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {integrations.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.05, 
                rotate: 2,
                boxShadow: "0 0 20px rgba(255,255,255,0.1)" 
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20 cursor-default"
            >
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span className="text-sm font-medium text-zinc-300">{item.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 text-sm font-medium text-zinc-400">
          <Link 
            href="https://github.com/NJX-njx/opensoul#supported-channels" 
            className="hover:text-white transition-colors flex items-center gap-1 group"
          >
            View all 50+ integrations 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link 
            href="https://github.com/NJX-njx/opensoul" 
            className="hover:text-white transition-colors flex items-center gap-1 group"
          >
            See what people built 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
