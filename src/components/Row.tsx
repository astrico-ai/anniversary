"use client";

import { useRef, useState, useEffect } from "react";
import type { Row as RowType } from "@/lib/types";
import { getShow } from "@/data/shows";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

type Props = { row: RowType };

export function Row({ row }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const shows = row.showIds.map(getShow).filter(Boolean);

  return (
    <section className="relative group/row mt-6 sm:mt-10">
      <h2 className="px-4 sm:px-8 lg:px-14 mb-2 sm:mb-3 text-base sm:text-xl md:text-2xl font-medium text-white/95">
        {row.title}
      </h2>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className={cn(
          "hidden md:grid absolute left-0 top-1/2 -translate-y-1/2 z-20 h-[calc(100%-2rem)] w-10 lg:w-14 bg-black/40 hover:bg-black/70 place-items-center transition-opacity",
          canScrollLeft
            ? "opacity-0 group-hover/row:opacity-100"
            : "opacity-0 pointer-events-none",
        )}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div
        ref={ref}
        className="row-scroll scrollbar-none flex items-stretch gap-2 sm:gap-3 overflow-x-auto px-4 sm:px-8 lg:px-14 py-4"
      >
        {shows.map(
          (s, i) => s && <Card key={s.id} show={s} index={i} />,
        )}
      </div>

      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className={cn(
          "hidden md:grid absolute right-0 top-1/2 -translate-y-1/2 z-20 h-[calc(100%-2rem)] w-10 lg:w-14 bg-black/40 hover:bg-black/70 place-items-center transition-opacity",
          canScrollRight
            ? "opacity-0 group-hover/row:opacity-100"
            : "opacity-0 pointer-events-none",
        )}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
}
