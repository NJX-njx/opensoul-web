"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeaderBranding() {
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-12 text-center z-10">
      {/* Image Subject */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-8 h-80 w-80 md:h-96 md:w-96"
      >
        <Image
          src="/girl-header.webp"
          alt="OpenSoul Character"
          fill
          priority
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 320px, 384px"
        />
      </motion.div>

      {/* Text Content */}
      <div className="max-w-4xl px-4">
        {/* H1: Primary Title */}
        <motion.h1
          {...animationProps}
          className="mb-4 font-bold text-[--color-primary] text-[2rem] md:text-[3rem] leading-tight"
          style={{ textShadow: "0 0 0.3px rgba(255,255,255,0.5)" }}
        >
          Your AI Soul Companion
        </motion.h1>

        {/* H2: Subtitle */}
        <motion.h2
          {...animationProps}
          transition={{ ...animationProps.transition, delay: 0.1 }}
          className="mb-6 font-medium text-[--color-secondary] text-[1.12rem] md:text-[1.6rem] leading-normal"
          style={{ textShadow: "0 0 0.3px rgba(161,161,170,0.5)" }}
        >
          Self-hosted AI agent across 30+ messaging channels
        </motion.h2>

        {/* H3: Supplement */}
        <motion.p
          {...animationProps}
          transition={{ ...animationProps.transition, delay: 0.2 }}
          className="mx-auto max-w-2xl font-light text-[--color-secondary] text-[0.875rem] md:text-[1.25rem] leading-[1.5em]"
          style={{ textShadow: "0 0 0.3px rgba(161,161,170,0.3)" }}
        >
          It can not only serve as an emotional companion in daily life (such as a
          lover or friend), but also help you complete various complex tasks like
          coding、training models through channels
        </motion.p>
      </div>
    </section>
  );
}
