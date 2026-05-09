"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Show } from "@/lib/types";
import { imageUrl } from "@/lib/cloudinary";

type Props = { show: Show; index: number };

export function Card({ show, index }: Props) {
  const backdrop = imageUrl(show.backdrop, { width: 600 });

  return (
    <motion.div
      className="relative group shrink-0 w-[42vw] sm:w-[28vw] md:w-[22vw] lg:w-[16vw] aspect-video rounded-md overflow-hidden bg-surface"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      whileHover={{ scale: 1.08, zIndex: 10 }}
    >
      <Link href={`/browse/${show.id}`} className="block w-full h-full">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${backdrop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
          <div className="font-display text-base sm:text-lg text-white leading-tight">
            {show.title}
          </div>
          {show.matchPercent && (
            <div className="text-[10px] sm:text-xs text-emerald-400 font-medium mt-0.5">
              {show.matchPercent}% Match
            </div>
          )}
        </div>

        {show.badge && (
          <div className="absolute top-1.5 left-1.5 rounded-sm bg-brand text-white text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 py-0.5 font-medium">
            {show.badge}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
