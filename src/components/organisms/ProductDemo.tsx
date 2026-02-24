"use client";

import { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/atoms/Container";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    src: "/images/demo/demo1.png",
    alt: "OpenSoul Chat Interface",
    title: "Natural Chat Experience",
    description: "Engage in seamless, context-aware conversations. The intuitive chat interface supports markdown rendering, code blocks, and real-time streaming responses for a fluid interaction.",
  },
  {
    src: "/images/demo/demo2.png",
    alt: "System Dashboard",
    title: "Real-time Monitoring",
    description: "Stay in control with the comprehensive dashboard. Monitor system health, active sessions, resource usage, and connectivity status at a glance.",
  },
  {
    src: "/images/demo/demo3.png",
    alt: "Advanced Configuration",
    title: "Granular Control",
    description: "Customize every aspect of your AI agent. Fine-tune model parameters, manage plugins, and configure behavior settings to match your specific requirements.",
  },
];

export function ProductDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      setIsAutoPlaying(false);
    } else if (e.key === "ArrowRight") {
      nextSlide();
      setIsAutoPlaying(false);
    }
  };

  // Touch handling for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section
      id="demo"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-black/20"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Product Demo Carousel"
    >
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Product Demo
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Experience the power and flexibility of OpenSoul through our intuitive interface.
          </p>
        </div>

        {/* Outer Flex Container for Buttons + Content */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12 relative">
          
          {/* Previous Button - Outside (Desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
              setIsAutoPlaying(false);
            }}
            className="hidden md:flex p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            className="relative w-full max-w-5xl group outline-none md:-translate-x-[10%] transition-transform duration-500"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Main Display Area */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col md:flex-row"
                >
                  {/* Image Section - 65% width on desktop */}
                  <div className="relative w-full h-2/3 md:h-full md:w-[65%] bg-black/20 flex items-center justify-center">
                    <div className="relative w-full h-full p-4 md:p-8">
                       <Image
                        src={slides[currentIndex].src}
                        alt={slides[currentIndex].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 65vw"
                        priority={currentIndex === 0}
                      />
                    </div>
                  </div>

                  {/* Text Content Section - 35% width on desktop */}
                  <div className="relative w-full h-1/3 md:h-full md:w-[35%] flex flex-col justify-center p-6 md:p-10 bg-white/5 backdrop-blur-md">
                    {/* Continuous Animation Wrapper */}
                    <motion.div
                      animate={{ 
                        opacity: [0.9, 1, 0.9],
                        scale: [0.98, 1, 0.98]
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
                      >
                        {slides[currentIndex].title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm md:text-base text-zinc-300 leading-relaxed"
                      >
                        {slides[currentIndex].description}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Navigation Buttons (Overlay) - Only visible on small screens */}
            <div className="md:hidden absolute inset-0 pointer-events-none flex items-center justify-between px-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                  setIsAutoPlaying(false);
                }}
                className="pointer-events-auto p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all focus:outline-none"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                  setIsAutoPlaying(false);
                }}
                className="pointer-events-auto p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all focus:outline-none"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`transition-all duration-300 focus:outline-none p-1 ${
                    index === currentIndex 
                      ? "text-white scale-125" 
                      : "text-white/30 hover:text-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentIndex}
                >
                  <Circle size={10} fill={index === currentIndex ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          {/* Next Button - Outside (Desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
              setIsAutoPlaying(false);
            }}
            className="hidden md:flex p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

        </div>
      </Container>
    </section>
  );
}
