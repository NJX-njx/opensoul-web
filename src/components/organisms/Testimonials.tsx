"use client";

import { Container } from "@/components/atoms/Container";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content: "OpenSoul completely changed how I manage my daily tasks. Having an AI that lives in my Telegram is a game changer.",
    author: "Alex Chen",
    role: "Developer",
  },
  {
    content: "The self-hosted aspect is what sold me. Finally, an AI assistant that respects my privacy and data ownership.",
    author: "Sarah Jones",
    role: "Product Manager",
  },
  {
    content: "I've connected OpenSoul to my Obsidian vault and it's like having a second brain that actually talks back.",
    author: "Mike Ross",
    role: "Writer",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-zinc-900/50 backdrop-blur-sm">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved by Developers
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Join thousands of users who are taking back control of their AI.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors hover:border-white/20"
            >
              <Quote className="absolute top-8 left-8 h-8 w-8 text-white/10" />
              <p className="relative z-10 mt-8 text-lg text-zinc-300">
                "{testimonial.content}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
