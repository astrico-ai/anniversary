"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

type Props = {
  onComplete: () => void;
  enableSound?: boolean;
};

export function Splash({ onComplete, enableSound = true }: Props) {
  const [stage, setStage] = useState<"idle" | "playing" | "done">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setStage("playing");
    if (enableSound && audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }
    const t = setTimeout(() => {
      setStage("done");
      setTimeout(onComplete, 600);
    }, 2600);
    return () => clearTimeout(t);
  }, [enableSound, onComplete]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <audio ref={audioRef} src="/sound/intro.mp3" preload="auto" />
          <motion.div
            initial={{ scale: 0.6, opacity: 0, filter: "blur(12px)" }}
            animate={{
              scale: [0.6, 1.05, 1],
              opacity: [0, 1, 1],
              filter: ["blur(12px)", "blur(0px)", "blur(0px)"],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.6, 1],
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            <Logo size="xl" glow />
          </motion.div>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.4, times: [0, 0.5, 1] }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(229,9,20,0.25) 0%, rgba(0,0,0,0) 60%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
