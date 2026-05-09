"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Show } from "@/lib/types";
import { imageUrl, videoUrl } from "@/lib/cloudinary";

type Props = { show: Show };

export function Billboard({ show }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const trailer = show.trailer
    ? videoUrl(show.trailer, { width: 1600, aspectRatio: "16:9", crop: "fill", gravity: "auto" })
    : "";
  const backdrop = imageUrl(show.backdrop, { width: 1920, quality: "auto" });

  useEffect(() => {
    if (!trailer) return;
    const t = setTimeout(() => setShowVideo(true), 1200);
    return () => clearTimeout(t);
  }, [trailer]);

  return (
    <section className="relative w-full h-[78dvh] sm:h-[88dvh] min-h-[520px] overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${backdrop})` }}
      />
      {trailer && showVideo && (
        <video
          ref={videoRef}
          src={trailer}
          autoPlay
          muted={muted}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 billboard-fade" />
      <div className="absolute inset-0 billboard-fade-side" />

      <div className="relative z-10 h-full flex items-end sm:items-center pb-20 sm:pb-0">
        <motion.div
          className="px-4 sm:px-8 lg:px-14 max-w-2xl"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          {show.badge && (
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              <span className="font-display text-brand text-xl sm:text-2xl tracking-[0.3em]">
                S&amp;S
              </span>
              <span className="text-white/80 uppercase text-[10px] sm:text-xs tracking-[0.4em]">
                Original Series
              </span>
            </div>
          )}

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            {show.title}
          </h1>

          <p className="mt-3 sm:mt-5 text-sm sm:text-lg md:text-xl text-white/85 max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            {show.synopsis}
          </p>

          <div className="mt-5 sm:mt-7 flex items-center gap-3">
            <Link
              href={`/browse/${show.id}`}
              className="flex items-center gap-2 rounded-md bg-white text-black px-5 sm:px-7 py-2.5 sm:py-3 font-medium hover:bg-white/90 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </Link>
            <Link
              href={`/browse/${show.id}`}
              className="flex items-center gap-2 rounded-md bg-white/20 backdrop-blur-sm text-white px-5 sm:px-7 py-2.5 sm:py-3 font-medium hover:bg-white/30 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              More Info
            </Link>
          </div>
        </motion.div>

        {trailer && showVideo && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            className="absolute right-4 sm:right-10 bottom-32 sm:bottom-24 z-20 size-10 sm:size-11 rounded-full border border-white/40 hover:border-white text-white grid place-items-center bg-black/30 backdrop-blur-sm"
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73 12 10.73 4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
