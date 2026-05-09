"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Episode } from "@/lib/types";
import { imageUrl, videoUrl } from "@/lib/cloudinary";

type Props = {
  episodes: Episode[];
  musicSrc: string;
  photoDuration?: number;
  musicStartTime?: number;
  videoDuration?: number;
  title: string;
  onClose: () => void;
};

// 8 Ken Burns presets — more dramatic range
const KB = [
  { from: { scale: 1.0,  x: "0%",   y: "0%"   }, to: { scale: 1.14, x: "0%",   y: "0%"   } }, // slow zoom in
  { from: { scale: 1.14, x: "0%",   y: "0%"   }, to: { scale: 1.0,  x: "0%",   y: "0%"   } }, // slow zoom out
  { from: { scale: 1.08, x: "3%",   y: "1.5%" }, to: { scale: 1.14, x: "-3%",  y: "-1.5%"} }, // pan left + zoom
  { from: { scale: 1.08, x: "-3%",  y: "-1.5%"}, to: { scale: 1.14, x: "3%",   y: "1.5%" } }, // pan right + zoom
  { from: { scale: 1.1,  x: "-2%",  y: "2%"   }, to: { scale: 1.04, x: "2%",   y: "-2%"  } }, // drift up-right
  { from: { scale: 1.04, x: "2%",   y: "-2%"  }, to: { scale: 1.1,  x: "-2%",  y: "2%"   } }, // drift down-left
  { from: { scale: 1.0,  x: "-3%",  y: "0%"   }, to: { scale: 1.12, x: "1%",   y: "-1%"  } }, // pan + zoom combo
  { from: { scale: 1.12, x: "1%",   y: "1%"   }, to: { scale: 1.0,  x: "-1%",  y: "-1%"  } }, // zoom out + drift
] as const;

// Slide transition variants — direction-aware parallax
const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "6%" : "-6%",
    opacity: 0,
    scale: 0.94,
    filter: "blur(4px)",
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "-4%" : "4%",
    opacity: 0,
    scale: 1.06,
    filter: "blur(6px)",
  }),
};

const enterTransition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // expo out — snappy land
};

const exitTransition = {
  duration: 0.55,
  ease: [0.55, 0, 1, 0.45] as [number, number, number, number], // ease in — accelerates away
};

export function SlideshowPlayer({
  episodes,
  musicSrc,
  photoDuration = 5000,
  musicStartTime = 0,
  videoDuration,
  title,
  onClose,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [flash, setFlash] = useState(false);
  const dirRef = useRef(1); // 1 = forward, -1 = backward
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rAFRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = episodes[index];
  const next = episodes[(index + 1) % episodes.length];
  const kb = KB[index % 8];

  const triggerFlash = useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
  }, []);

  const go = useCallback(
    (to: number, dir?: number) => {
      dirRef.current = dir ?? (to > index ? 1 : -1);
      triggerFlash();
      setIndex(to);
      setPaused(false);
    },
    [index, triggerFlash],
  );

  const advance = useCallback(() => {
    dirRef.current = 1;
    triggerFlash();
    setIndex((i) => {
      if (i >= episodes.length - 1) return i;
      return i + 1;
    });
    setPaused(false);
  }, [episodes.length, triggerFlash]);

  const smoothVolume = useCallback((target: number, ms = 700, onDone?: () => void) => {
    const audio = musicRef.current;
    if (!audio) return;
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    const startVol = audio.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      audio.volume = Math.max(0, Math.min(1, startVol + (target - startVol) * eased));
      if (p < 1) {
        rAFRef.current = requestAnimationFrame(step);
      } else {
        onDone?.();
      }
    };
    rAFRef.current = requestAnimationFrame(step);
  }, []);

  // Start music at 37s to skip intro
  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.currentTime = musicStartTime;
    audio.play().catch(() => {});
    smoothVolume(0.85);
    return () => {
      audio.pause();
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [smoothVolume]);

  // Pause / resume music with slideshow
  useEffect(() => {
    const audio = musicRef.current;
    if (!audio || !musicOn) return;
    if (paused) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
      smoothVolume(current?.mediaType === "video" ? 0.2 : 0.85);
    }
  }, [paused, musicOn, smoothVolume, current?.mediaType]);

  // Pause / resume video element
  useEffect(() => {
    if (current?.mediaType !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    if (paused) {
      v.pause();
    } else {
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  }, [paused, current?.mediaType]);

  // Music toggle
  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;
    if (!musicOn) {
      smoothVolume(0);
    } else if (!paused) {
      smoothVolume(current?.mediaType === "video" ? 0.2 : 0.85);
    }
  }, [musicOn, paused, current?.mediaType, smoothVolume]);

  // Duck/unduck on video slides
  useEffect(() => {
    if (!musicOn || paused) return;
    smoothVolume(current?.mediaType === "video" ? 0.2 : 0.85);
  }, [index, current?.mediaType, musicOn, paused, smoothVolume]);

  // Photo auto-advance
  useEffect(() => {
    if (current?.mediaType !== "image" || paused) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(advance, photoDuration);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, current?.mediaType, paused, advance, photoDuration]);

  // Play video when active — mute first if needed for iOS autoplay policy
  useEffect(() => {
    if (current?.mediaType === "video") {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = 0;
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  }, [index, current?.mediaType]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") advance();
      if (e.key === "ArrowLeft") go(Math.max(0, index - 1), -1);
      if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, go, index, onClose]);

  function getSrc(ep: Episode) {
    return ep.mediaType === "video"
      ? videoUrl(ep.media, { width: 1280, ...(videoDuration && { duration: videoDuration }) })
      : imageUrl(ep.media, { width: 1400, quality: "auto" });
  }

  const mediaSrc = current ? getSrc(current) : "";
  const nextSrc = next ? getSrc(next) : null;
  const nextIsVideo = next?.mediaType === "video";

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <audio ref={musicRef} src={musicSrc} preload="auto" />
      {/* Preload next slide */}
      {nextSrc && !nextIsVideo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={nextSrc} alt="" className="hidden" aria-hidden />
      )}
      {nextSrc && nextIsVideo && (
        <video src={nextSrc} preload="auto" className="hidden" aria-hidden muted playsInline />
      )}

      {/* ── Top bar ── */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 min-w-0 pointer-events-auto">
          <button type="button" onClick={onClose} aria-label="Close"
            className="shrink-0 size-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur grid place-items-center transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="min-w-0">
            <div className="font-display text-lg sm:text-2xl leading-none truncate">{title}</div>
            <div className="text-xs text-white/50 mt-0.5 tabular-nums">{index + 1} / {episodes.length}</div>
          </div>
        </div>
        <button type="button" onClick={() => setMusicOn((m) => !m)}
          className="pointer-events-auto shrink-0 flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors text-xs text-white/80">
          {musicOn
            ? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z" /></svg>
            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="1" y1="1" x2="23" y2="23" /><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /></svg>
          }
          <span className="hidden sm:inline">{musicOn ? "Music on" : "Music off"}</span>
        </button>
      </div>

      {/* ── Slide area ── */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync" custom={dirRef.current}>
          <motion.div
            key={index}
            custom={dirRef.current}
            className="absolute inset-0"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity:  { duration: 0.65, ease: "easeOut" },
              scale:    index === 0 ? enterTransition : exitTransition,
              x:        enterTransition,
              filter:   { duration: 0.5 },
            }}
          >
            {current?.mediaType === "video" ? (
              <video
                ref={videoRef}
                src={mediaSrc}
                playsInline
                onEnded={() => {
                  if (index >= episodes.length - 1) {
                    smoothVolume(0, 1500, () => { if (musicRef.current) musicRef.current.pause(); });
                  } else {
                    smoothVolume(0.85);
                    advance();
                  }
                }}
                onClick={(e) => { const v = e.currentTarget; v.paused ? v.play() : v.pause(); }}
                className="w-full h-full object-contain cursor-pointer"
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden">
                {/* Blurred ambient background */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mediaSrc} alt="" aria-hidden
                  className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-30 pointer-events-none select-none" />

                {/* Ken Burns layer */}
                <motion.div
                  key={`kb-${index}`}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={kb.from}
                  animate={kb.to}
                  transition={{ duration: photoDuration / 1000 + 1.5, ease: "linear" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mediaSrc}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                  />
                </motion.div>

                {/* Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.65) 100%)" }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Film flash — brief light leak between slides */}
        <AnimatePresence>
          {flash && (
            <motion.div
              key="flash"
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ opacity: 0.28 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,220,180,0.4) 50%, transparent 80%)" }}
            />
          )}
        </AnimatePresence>

        {/* Tap zones */}
        <button type="button" aria-label="Previous" onClick={() => go(Math.max(0, index - 1), -1)}
          className="absolute left-0 top-14 bottom-24 w-1/4 z-10" />
        <button type="button" aria-label={paused ? "Resume" : "Pause"}
          onClick={() => setPaused((p) => !p)}
          className="absolute inset-x-1/4 top-14 bottom-24 z-10" />
        <button type="button" aria-label="Next" onClick={advance}
          className="absolute right-0 top-14 bottom-24 w-1/4 z-10" />

        {/* Pause indicator */}
        <AnimatePresence>
          {paused && (
            <motion.div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2, ease: "backOut" }}>
              <div className="size-16 sm:size-20 rounded-full bg-black/60 backdrop-blur-md grid place-items-center ring-1 ring-white/20">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1.5" />
                  <rect x="14" y="4" width="4" height="16" rx="1.5" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom controls ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-24 pb-8 px-5 sm:px-10 pointer-events-none">
        {/* Progress bar */}
        <div className="relative h-[2px] bg-white/15 rounded-full mb-5 max-w-3xl mx-auto overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-white/60 rounded-full"
            animate={{ width: `${((index + 1) / episodes.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }} />
          {current?.mediaType === "image" && !paused && (
            <motion.div key={`p-${index}`}
              className="absolute inset-y-0 left-0 bg-brand rounded-full"
              initial={{ width: `${(index / episodes.length) * 100}%` }}
              animate={{ width: `${((index + 1) / episodes.length) * 100}%` }}
              transition={{ duration: photoDuration / 1000, ease: "linear" }} />
          )}
        </div>

        <div className="flex items-center justify-between max-w-3xl mx-auto gap-3 pointer-events-auto">
          <button type="button" onClick={() => go(Math.max(0, index - 1), -1)} disabled={index === 0}
            className="size-11 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 grid place-items-center transition-colors backdrop-blur shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          {/* Play / Pause */}
          <button type="button"
            onClick={() => setPaused((p) => !p)}
            className="size-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition-colors backdrop-blur shrink-0">
            {paused
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1.5" /><rect x="14" y="4" width="4" height="16" rx="1.5" /></svg>
            }
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center flex-1 min-w-0">
            {episodes.map((ep, i) => (
              <button key={i} type="button" onClick={() => go(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index          ? "bg-white w-5 h-1.5"
                  : ep.mediaType === "video" ? "bg-brand/70 hover:bg-brand w-2 h-2 rounded-sm"
                  : "bg-white/30 hover:bg-white/60 w-1.5 h-1.5"
                }`} />
            ))}
          </div>

          <button type="button" onClick={advance}
            className="size-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition-colors backdrop-blur shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
