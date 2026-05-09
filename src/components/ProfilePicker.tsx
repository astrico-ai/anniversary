"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { profiles } from "@/data/profiles";

export function ProfilePicker() {
  const router = useRouter();

  return (
    <motion.div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white/95 mb-10 sm:mb-16 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Who&apos;s watching?
      </motion.h1>

      <motion.div
        className="flex flex-wrap items-start justify-center gap-6 sm:gap-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
        }}
      >
        {profiles.map((p) => (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.setItem("sns:profile", p.id);
              }
              router.push("/browse");
            }}
            className="group flex flex-col items-center gap-3 outline-none"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            <div
              className="size-28 sm:size-36 md:size-40 rounded-md overflow-hidden ring-0 ring-white group-hover:ring-2 group-focus:ring-2 transition-all duration-200 flex items-center justify-center font-display text-6xl sm:text-7xl"
              style={{
                background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)`,
              }}
            >
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                {p.avatarText}
              </span>
            </div>
            <span className="text-white/60 group-hover:text-white text-base sm:text-lg tracking-wide transition-colors">
              {p.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      <motion.p
        className="mt-12 sm:mt-20 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        An S&amp;S Original
      </motion.p>
    </motion.div>
  );
}
