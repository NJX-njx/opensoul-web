"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export const DemoVideo: React.FC<DemoVideoProps> = ({ src, poster, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default muted for autoplay
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Toggle Play/Pause
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Handle Progress Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  // Seek Video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(Number(e.target.value));
    }
  };

  // Keyboard Shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case " ":
        case "Enter":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          if (videoRef.current) videoRef.current.currentTime -= 10;
          break;
        case "ArrowRight":
          if (videoRef.current) videoRef.current.currentTime += 10;
          break;
        case "m":
        case "M":
          toggleMute();
          break;
      }
    },
    [togglePlay, toggleMute]
  );

  // Auto-play when loaded (since we want autoplay loop muted)
  useEffect(() => {
    if (videoRef.current) {
      // Try to autoplay
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
            // If autoplay fails (e.g. browser policy), we show the play button state
          });
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-[1200px] aspect-video rounded-[8px] overflow-hidden group",
        "shadow-[0_12px_24px_0_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_0_rgba(0,0,0,0.18)] transition-shadow duration-200",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Demo Product Video"
    >
      {/* Placeholder / Poster (Gaussian Blur) */}
      <div
        className={cn(
          "absolute inset-0 bg-blue-900/20 backdrop-blur-xl transition-opacity duration-300 ease-out z-10 pointer-events-none",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      />

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        loop
        muted={isMuted}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={() => setIsLoaded(true)}
        onPlaying={() => setIsLoaded(true)}
        onClick={togglePlay}
        aria-label="Product Demo Video"
      />

      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent flex items-end px-4 pb-4 transition-opacity duration-200",
          isHovering || !isPlaying ? "opacity-100" : "opacity-0 md:opacity-100" // Always show on desktop hover, hide on mobile if playing? Or keep simple. 
          // Requirement: "Overlay 40% transparency gradient mask... ensure white text readable"
          // Let's keep it visible when hovering or paused.
        )}
      >
        <div className="w-full flex items-center gap-4 text-white">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="text-[#0052D9] hover:text-[#0066FF] transition-colors focus:outline-none"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={24} strokeWidth={1.5} />
            ) : (
              <Play size={24} strokeWidth={1.5} />
            )}
          </button>

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#0052D9] hover:accent-[#0066FF] focus:outline-none focus:ring-2 focus:ring-[#0052D9]/50"
            aria-label="Video Progress"
            style={{
              backgroundSize: `${progress}% 100%`,
              backgroundImage: `linear-gradient(#0052D9, #0052D9)`
            }}
          />

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="text-[#0052D9] hover:text-[#0066FF] transition-colors focus:outline-none"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX size={24} strokeWidth={1.5} />
            ) : (
              <Volume2 size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
