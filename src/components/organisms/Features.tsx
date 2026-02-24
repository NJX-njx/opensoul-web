"use client";

import { Container } from "@/components/atoms/Container";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "30+ Messaging Channels",
    description: "Connect your AI companion to the apps you already use like WhatsApp, Telegram, Discord, and Slack without installing new apps. Seamlessly integrates into any workspace like GitHub and VSCode.",
    image: "/feature-1.webp",
    link: "https://github.com/NJX-njx/opensoul",
  },
  {
    title: "50+ Built-in Skills",
    description: "Empower your agent with real-world capabilities: GitHub operations, Notion management, image generation, and PDF processing.",
    image: "/feature-2.webp",
    link: "https://github.com/NJX-njx/opensoul",
  },
  {
    title: "Privacy-First & Self-Hosted",
    description: "Built with advanced memory systems to recall interactions, self-improving feedback loops for continuous learning, and deep emotional modeling to truly understand you.",
    image: "/feature-3.webp",
    link: "https://github.com/NJX-njx/opensoul",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why OpenSoul?
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            A self-hosted AI agent that lives across all your apps, designed for both emotional companionship and productivity.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-white/5"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl border-b border-white/5">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay Gradient for better text contrast if needed, mostly handled by card structure */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 pt-6">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
                
                <div className="mt-6 pt-4 border-t border-white/5">
                    <Link 
                        href={feature.link}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-blue-400"
                    >
                        View Demo <ArrowRight size={14} />
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
