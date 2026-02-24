"use client";

import { useState, useEffect } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface ReleaseData {
  tag_name: string;
  assets: ReleaseAsset[];
  zipball_url: string;
}

const GITHUB_REPO = "NJX-njx/opensoul";
const CACHE_KEY = "opensoul_latest_release";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export function DownloadButton() {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isWindows, setIsWindows] = useState(false);

  useEffect(() => {
    // Check if user is on Windows
    setIsWindows(/Windows/.test(navigator.userAgent));
  }, []);

  const fetchLatestRelease = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          processReleaseData(data);
          setLoading(false);
          return;
        }
      }

      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch release info");
      }

      const data: ReleaseData = await response.json();
      
      // Update cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data, timestamp: Date.now() })
      );

      processReleaseData(data);
    } catch (err) {
      console.error("Download fetch error:", err);
      setError("Failed to check updates");
      // Fallback to releases page
      setDownloadUrl(`https://github.com/${GITHUB_REPO}/releases/latest`);
    } finally {
      setLoading(false);
    }
  };

  const processReleaseData = (data: ReleaseData) => {
    setVersion(data.tag_name);

    // Find Windows executable (.exe or .msi)
    const winAsset = data.assets.find(
      (asset) =>
        asset.name.endsWith(".exe") ||
        asset.name.endsWith(".msi") ||
        (asset.name.endsWith(".zip") && asset.name.toLowerCase().includes("windows"))
    );

    if (winAsset) {
      setDownloadUrl(winAsset.browser_download_url);
      setFileSize((winAsset.size / (1024 * 1024)).toFixed(1) + " MB");
    } else {
      // Fallback to source code zip
      setDownloadUrl(data.zipball_url);
      setFileSize("Source Code");
      setError("Windows binary not found, downloading source");
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.location.href = downloadUrl;
      return;
    }
    fetchLatestRelease().then(() => {
        // Auto trigger download after fetch if successful
        // We need to use a ref or state callback in a real scenario, 
        // but for simplicity here we rely on the user clicking again or the state update
        // Actually, let's just trigger it if we found a URL in the processReleaseData
        // But since state updates are async, it's safer to just let the user click again or use an effect
        // For this UX, we'll just fetch and show the info, and let the user click "Download" (which will be the state)
    });
  };

  // If not windows, don't show or show different message? 
  // Requirement says "oriented to Windows users", but keep it visible.
  // We'll show it but maybe with a hint if not windows? 
  // Requirement: "Download button needs to be always visible"

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={downloadUrl ? handleDownload : fetchLatestRelease}
        className={cn(
          "relative flex items-center gap-3 overflow-hidden rounded-full px-8 py-3 text-sm font-semibold transition-all",
          downloadUrl
            ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            : "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm"
        )}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Checking...</span>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              <span>
                {downloadUrl ? "Download for Windows" : "Windows Latest Download"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Progress Bar / Loading Indicator Background */}
        {loading && (
            <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
            />
        )}
      </motion.button>

      {/* Meta Info */}
      <AnimatePresence>
        {(version || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center text-xs text-zinc-400"
          >
            {version && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-300">{version}</span>
                {fileSize && <span>• {fileSize}</span>}
              </div>
            )}
            {error && (
              <div className="mt-1 flex items-center gap-1 text-amber-400">
                <AlertCircle size={12} />
                <span>{error}</span>
              </div>
            )}
            {!isWindows && (
               <div className="mt-1 text-zinc-600">
                   Detected: Non-Windows OS
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
