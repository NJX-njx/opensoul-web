"use client";

import { Container } from "@/components/atoms/Container";
import { Terminal } from "@/components/molecules/Terminal";
import { DownloadButton } from "@/components/molecules/DownloadButton";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
              Your AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Soul</span> Companion
            </h1>
            <p className="mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed">
              OpenSoul is a self-hosted AI agent that lives across all your apps. 
              Connect with WhatsApp, Telegram, Discord, and 30+ more channels. 
              Your data stays yours.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <DownloadButton />
              
              <Link
                href="https://github.com/NJX-njx/opensoul"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <Github size={20} />
                Star on GitHub
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <Terminal />
            {/* Glow effect behind terminal */}
            <div className="absolute -inset-4 -z-10 rounded-full bg-white/5 blur-3xl" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
