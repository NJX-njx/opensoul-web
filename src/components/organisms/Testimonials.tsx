"use client";

import { Container } from "@/components/atoms/Container";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonialsRow1 = [
  {
    content: "Finally an AI that runs locally without eating all my RAM. The docker setup was seamless.",
    author: "David K.",
    role: "DevOps Engineer",
  },
  {
    content: "Connected OpenSoul to my Obsidian vault. It actually understands my messy notes. Game changer.",
    author: "Elena R.",
    role: "Researcher",
  },
  {
    content: "The ability to write custom skills in TypeScript is exactly what I needed. Documentation is top notch.",
    author: "Marcus T.",
    role: "Full Stack Dev",
  },
  {
    content: "Bye bye monthly subscription fees. Running this on my home server is pure bliss.",
    author: "Sarah L.",
    role: "Privacy Advocate",
  },
  {
    content: "OpenSoul completely changed how I manage my daily tasks. Having an AI that lives in my Telegram is a game changer.",
    author: "Alex Chen",
    role: "Developer",
  },
];

const testimonialsRow2 = [
  {
    content: "I use it to triage GitHub issues automatically. It feels like having a junior dev on 24/7.",
    author: "James P.",
    role: "Maintainer",
  },
  {
    content: "The Telegram integration is surprisingly fast. Low latency voice mode is also a nice touch.",
    author: "Sophie M.",
    role: "Mobile Dev",
  },
  {
    content: "Privacy first. That's the tweet. OpenSoul respects my data sovereignty.",
    author: "Ryan G.",
    role: "Security Analyst",
  },
  {
    content: "Building a personal CRM agent took me less than an hour with the built-in skills.",
    author: "Linda W.",
    role: "Freelancer",
  },
  {
    content: "The self-hosted aspect is what sold me. Finally, an AI assistant that respects my privacy and data ownership.",
    author: "Sarah Jones",
    role: "Product Manager",
  },
];

interface TestimonialCardProps {
  testimonial: {
    content: string;
    author: string;
    role: string;
  };
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative w-[350px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10">
      <Quote className="absolute top-6 left-6 h-6 w-6 text-white/10" />
      <p className="relative z-10 mt-6 text-base leading-relaxed text-zinc-300">
        "{testimonial.content}"
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
        <div>
          <div className="text-sm font-semibold text-white">
            {testimonial.author}
          </div>
          <div className="text-xs text-zinc-500">
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved by Developers
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Join thousands of users who are taking back control of their AI.
          </p>
        </div>
      </Container>

      <div className="flex flex-col gap-8 hover-pause">
        {/* Row 1: Left Scroll */}
        <div className="flex overflow-hidden">
          <div className="flex gap-6 animate-marquee flex-shrink-0 min-w-full justify-around px-3">
            {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
              <TestimonialCard key={`row1-a-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="flex gap-6 animate-marquee flex-shrink-0 min-w-full justify-around px-3">
            {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
              <TestimonialCard key={`row1-b-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Row 2: Right Scroll */}
        <div className="flex overflow-hidden">
          <div className="flex gap-6 animate-marquee-reverse flex-shrink-0 min-w-full justify-around px-3">
            {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
              <TestimonialCard key={`row2-a-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="flex gap-6 animate-marquee-reverse flex-shrink-0 min-w-full justify-around px-3">
            {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
              <TestimonialCard key={`row2-b-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
