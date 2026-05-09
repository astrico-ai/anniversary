"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Show, Episode, MediaSource } from "@/lib/types";
import {
  imageUrl,
  videoUrl,
  videoPosterUrl,
} from "@/lib/cloudinary";
import { SlideshowPlayer } from "./SlideshowPlayer";

type Props = { show: Show; related: Show[] };

function mediaPoster(m: MediaSource, mediaType: "image" | "video") {
  return mediaType === "video"
    ? videoPosterUrl(m, { width: 800 })
    : imageUrl(m, { width: 800 });
}

export function DetailView({ show, related }: Props) {
  const backdrop = imageUrl(show.backdrop, { width: 1920 });
  const trailer = show.trailer ? videoUrl(show.trailer, { width: 1600 }) : "";
  const [selected, setSelected] = useState<Episode | null>(null);
  const [slideshowOpen, setSlideshowOpen] = useState(false);

  return (
    <main className="bg-black text-white pb-24">
      <section className="relative w-full h-[55dvh] sm:h-[70dvh] min-h-[420px] overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${backdrop})` }}
        />
        {trailer && (
          <video
            src={trailer}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 billboard-fade" />
        <Link
          href="/browse"
          aria-label="Back"
          className="absolute top-4 left-4 z-20 size-10 rounded-full bg-black/60 backdrop-blur grid place-items-center hover:bg-black"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>

        <motion.div
          className="absolute bottom-6 sm:bottom-12 left-4 sm:left-10 lg:left-14 right-4 max-w-3xl"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          {show.badge && (
            <div className="mb-2 inline-block rounded-sm bg-brand text-white text-[10px] sm:text-xs uppercase tracking-[0.25em] px-2 py-1">
              {show.badge}
            </div>
          )}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            {show.title}
          </h1>
          <p className="mt-2 text-sm sm:text-lg text-white/80">{show.tagline}</p>

          <div className="mt-4 flex items-center gap-3">
            {show.slideshow ? (
              <button
                type="button"
                onClick={() => setSlideshowOpen(true)}
                className="flex items-center gap-2 rounded-md bg-white text-black px-5 sm:px-7 py-2.5 font-medium hover:bg-white/90 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play All
              </button>
            ) : show.episodes[0] ? (
              <button
                type="button"
                onClick={() => setSelected(show.episodes[0])}
                className="flex items-center gap-2 rounded-md bg-white text-black px-5 sm:px-7 py-2.5 font-medium hover:bg-white/90 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
            ) : null}
            <button
              type="button"
              className="flex items-center gap-2 rounded-md bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-4 sm:px-5 py-2.5 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              My List
            </button>
          </div>
        </motion.div>
      </section>

      <section className="px-4 sm:px-8 lg:px-14 mt-6 grid gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-sm text-white/70 mb-3">
            {show.matchPercent && (
              <span className="text-emerald-400 font-semibold">
                {show.matchPercent}% Match
              </span>
            )}
            <span>{show.year}</span>
            {show.rating && (
              <span className="border border-white/30 px-1.5 text-[11px] uppercase">
                {show.rating}
              </span>
            )}
            {show.durationLabel && <span>{show.durationLabel}</span>}
          </div>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed">
            {show.synopsis}
          </p>
        </div>
        <aside className="text-sm text-white/70 space-y-2">
          {show.cast && show.cast.length > 0 && (
            <div>
              <span className="text-white/50">Cast: </span>
              <span className="text-white/90">{show.cast.join(", ")}</span>
            </div>
          )}
          {show.genres && show.genres.length > 0 && (
            <div>
              <span className="text-white/50">Genres: </span>
              <span className="text-white/90">{show.genres.join(", ")}</span>
            </div>
          )}
        </aside>
      </section>

      {show.slideshow ? (
        <section className="px-4 sm:px-8 lg:px-14 mt-12">
          <h2 className="text-xl sm:text-2xl font-medium mb-4">Full Show</h2>
          <button
            type="button"
            onClick={() => setSlideshowOpen(true)}
            className="w-full group flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
          >
            <div className="relative size-16 sm:size-20 rounded-lg overflow-hidden bg-surface shrink-0">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                  backgroundImage: `url(${mediaPoster(show.episodes[0].thumbnail, show.episodes[0].mediaType)})`,
                }}
              />
              <div className="absolute inset-0 grid place-items-center bg-black/40">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-base sm:text-lg">{show.title} — Full Show</div>
              <div className="text-sm text-white/60 mt-0.5">
                {show.episodes.length} moments · with music
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="shrink-0 text-white/50 group-hover:text-white transition-colors">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </section>
      ) : (
        <section className="px-4 sm:px-8 lg:px-14 mt-12">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-medium">Episodes</h2>
            <span className="text-sm text-white/60">
              {show.episodes.length}{" "}
              {show.episodes.length === 1 ? "Episode" : "Episodes"}
            </span>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {show.episodes.map((ep, i) => (
              <li key={ep.id}>
                <button
                  type="button"
                  onClick={() => setSelected(ep)}
                  className="w-full grid grid-cols-[40px_140px_1fr] sm:grid-cols-[60px_220px_1fr] items-center gap-3 sm:gap-5 py-3 sm:py-5 text-left hover:bg-white/5 transition-colors px-2"
                >
                  <span className="text-2xl sm:text-3xl text-white/50 font-light">
                    {i + 1}
                  </span>
                  <div className="relative aspect-video rounded overflow-hidden bg-surface">
                    <div
                      className="absolute inset-0 bg-center bg-cover"
                      style={{
                        backgroundImage: `url(${mediaPoster(ep.thumbnail, ep.mediaType)})`,
                      }}
                    />
                    <div className="absolute inset-0 grid place-items-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium truncate">{ep.title}</h3>
                      {ep.durationLabel && (
                        <span className="text-xs text-white/60 shrink-0">
                          {ep.durationLabel}
                        </span>
                      )}
                    </div>
                    {ep.description && (
                      <p className="text-sm text-white/70 mt-1 line-clamp-2">
                        {ep.description}
                      </p>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="px-4 sm:px-8 lg:px-14 mt-12">
          <h2 className="text-xl sm:text-2xl font-medium mb-4">More Like This</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/browse/${r.id}`}
                className="group rounded-md overflow-hidden bg-surface aspect-video relative"
              >
                <div
                  className="absolute inset-0 bg-center bg-cover transition-transform group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${imageUrl(r.backdrop, { width: 600 })})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 font-display text-base sm:text-lg">
                  {r.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {selected && (
        <EpisodePlayer
          episode={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <AnimatePresence>
        {slideshowOpen && show.slideshow && (
          <SlideshowPlayer
            episodes={show.episodes}
            musicSrc={show.slideshow.musicSrc}
            photoDuration={show.slideshow.photoDuration}
            musicStartTime={show.slideshow.musicStartTime}
            videoDuration={show.slideshow.videoDuration}
            title={show.title}
            onClose={() => setSlideshowOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function EpisodePlayer({
  episode,
  onClose,
}: {
  episode: Episode;
  onClose: () => void;
}) {
  const isVideo = episode.mediaType === "video";
  const src = isVideo
    ? videoUrl(episode.media, { width: 1600 })
    : imageUrl(episode.media, { width: 1600 });

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/95 grid place-items-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 size-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <motion.div
        className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain bg-black"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={episode.title}
            className="w-full h-full object-contain bg-black"
          />
        )}
      </motion.div>
      <div className="absolute bottom-6 left-0 right-0 px-4 text-center">
        <h3 className="font-display text-xl sm:text-2xl">{episode.title}</h3>
        {episode.description && (
          <p className="text-white/70 text-sm sm:text-base mt-1 max-w-2xl mx-auto">
            {episode.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
