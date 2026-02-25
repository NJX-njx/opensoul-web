"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "@/components/atoms/Container";
import { DemoVideo } from "@/components/molecules/DemoVideo";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import Image from "next/image";

const videos = [
  "/assets/video/opensoul_demo_video2.mp4",
  "/assets/video/opensoul_demo_video3.mp4",
];

const imageSlides = [
  {
    src: "/assets/images/demo/image1.png",
    alt: "Interactive Chat Interface",
    title: "Interactive Chat Interface",
    description: "Experience a seamless conversational flow with our advanced chat interface. Supports rich text, code blocks, and real-time streaming for a natural interaction.",
  },
  {
    src: "/assets/images/demo/image2.png",
    alt: "Agent Management Dashboard",
    title: "Agent Management Dashboard",
    description: "Monitor and manage your AI agents with ease. The dashboard provides a comprehensive view of agent status, performance metrics, and active sessions.",
  },
  {
    src: "/assets/images/demo/image3.png",
    alt: "Granular Configuration",
    title: "Granular Configuration",
    description: "Fine-tune every aspect of your system. Access detailed configuration settings to customize behavior, model parameters, and plugin integrations.",
  },
  {
    src: "/assets/images/demo/image4.png",
    alt: "System Diagnostics",
    title: "System Diagnostics",
    description: "Keep your system healthy with built-in diagnostics tools. View real-time logs, resource usage, and system health checks at a glance.",
  },
];

export function ProductDemo() {
  // --- Video Carousel State ---
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoAutoPlaying, setIsVideoAutoPlaying] = useState(false); // Default to false for manual control
  
  // --- Image Carousel State ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageAutoPlaying, setIsImageAutoPlaying] = useState(true);

  // --- Video Logic ---
  const nextVideo = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  }, []);

  const prevVideo = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, []);

  // --- Image Logic ---
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % imageSlides.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + imageSlides.length) % imageSlides.length);
  }, []);

  // Image Auto-play
  useEffect(() => {
    if (!isImageAutoPlaying) return;
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [isImageAutoPlaying, nextImage]);

  // Touch handling for Image Swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsImageAutoPlaying(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  // Video Swipe Logic
  const [videoTouchStart, setVideoTouchStart] = useState<number | null>(null);
  const [videoTouchEnd, setVideoTouchEnd] = useState<number | null>(null);

  const onVideoTouchStart = (e: React.TouchEvent) => {
    setVideoTouchEnd(null);
    setVideoTouchStart(e.targetTouches[0].clientX);
  };

  const onVideoTouchMove = (e: React.TouchEvent) => {
    setVideoTouchEnd(e.targetTouches[0].clientX);
  };

  const onVideoTouchEnd = () => {
    if (!videoTouchStart || !videoTouchEnd) return;
    const distance = videoTouchStart - videoTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) nextVideo();
    if (isRightSwipe) prevVideo();
  };


  return (
    <section
      id="demo"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-black/20"
      aria-label="Product Demo Section"
    >
      <Container className="relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Product Demo
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Experience the power and flexibility of OpenSoul through our intuitive interface.
          </p>
        </div>

        {/* --- Video Showcase Section --- */}
        <div className="mb-24 w-full">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Feature Walkthrough</h3>
            <div 
              className="relative w-full max-w-[1200px] mx-auto group"
              onTouchStart={onVideoTouchStart}
              onTouchMove={onVideoTouchMove}
              onTouchEnd={onVideoTouchEnd}
            >
                {/* Video Carousel Controls (Desktop) */}
                <button
                    onClick={prevVideo}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Previous video"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextVideo}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Next video"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Video Container with Animation */}
                <div className="overflow-hidden rounded-xl shadow-2xl bg-black/20 backdrop-blur-sm border border-white/5 aspect-video relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentVideoIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-full h-full"
                        >
                            <DemoVideo 
                                src={videos[currentVideoIndex]} 
                                className="w-full h-full"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Video Indicators */}
                <div className="flex justify-center mt-6 gap-2">
                    {videos.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentVideoIndex(idx)}
                            className={`transition-all duration-300 ${
                                idx === currentVideoIndex 
                                    ? "w-8 h-2 bg-blue-500 rounded-full" 
                                    : "w-2 h-2 bg-zinc-600 rounded-full hover:bg-zinc-500"
                            }`}
                            aria-label={`Go to video ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* --- Image Showcase Section --- */}
        <div className="w-full">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Interface Highlights</h3>
            
            <div className="relative w-full max-w-5xl mx-auto">
                {/* Image Controls (Desktop) */}
                 <button
                    onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                        setIsImageAutoPlaying(false);
                    }}
                    className="hidden md:flex absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 z-20"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                        setIsImageAutoPlaying(false);
                    }}
                    className="hidden md:flex absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 z-20"
                    aria-label="Next image"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Image Content */}
                <div 
                    className="relative group outline-none"
                    onMouseEnter={() => setIsImageAutoPlaying(false)}
                    onMouseLeave={() => setIsImageAutoPlaying(true)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute inset-0 flex flex-col md:flex-row"
                            >
                                {/* Image Section - 65% width on desktop */}
                                <div className="relative w-full h-2/3 md:h-full md:w-[65%] bg-black/20 flex items-center justify-center p-4 md:p-8">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={imageSlides[currentImageIndex].src}
                                            alt={imageSlides[currentImageIndex].alt}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 65vw"
                                            priority={currentImageIndex === 0}
                                        />
                                    </div>
                                </div>

                                {/* Text Content Section - 35% width on desktop */}
                                <div className="relative w-full h-1/3 md:h-full md:w-[35%] flex flex-col justify-center p-6 md:p-10 bg-white/5 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/5">
                                    <motion.h3 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
                                    >
                                        {imageSlides[currentImageIndex].title}
                                    </motion.h3>
                                    <motion.p 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-sm md:text-base text-zinc-300 leading-relaxed"
                                    >
                                        {imageSlides[currentImageIndex].description}
                                    </motion.p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Image Indicators */}
                    <div className="flex justify-center mt-6 gap-2">
                        {imageSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentImageIndex(idx);
                                    setIsImageAutoPlaying(false);
                                }}
                                className={`transition-all duration-300 ${
                                    idx === currentImageIndex 
                                        ? "w-8 h-2 bg-blue-500 rounded-full" 
                                        : "w-2 h-2 bg-zinc-600 rounded-full hover:bg-zinc-500"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </Container>
    </section>
  );
}
