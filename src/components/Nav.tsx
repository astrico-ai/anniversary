"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const links = [
  { href: "/browse", label: "Home" },
  { href: "/browse?tab=shows", label: "Shows" },
  { href: "/browse?tab=mylist", label: "My List" },
  { href: "/browse?tab=new", label: "New & Notable" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-30 transition-colors duration-300",
        scrolled
          ? "bg-black/95 backdrop-blur-sm"
          : "bg-gradient-to-b from-black/80 to-transparent",
      )}
    >
      <nav className="flex items-center gap-4 sm:gap-8 px-4 sm:px-8 lg:px-14 h-14 sm:h-16">
        <Link href="/browse" className="flex items-center">
          <Logo size="md" className="text-2xl sm:text-3xl" />
        </Link>
        <ul className="hidden md:flex items-center gap-5 text-sm text-white/80">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-3 text-white/70">
          <button
            type="button"
            aria-label="Search"
            className="p-2 hover:text-white transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <Link
            href="/"
            aria-label="Switch profile"
            className="size-7 sm:size-8 rounded bg-brand/90 grid place-items-center font-display text-white text-sm sm:text-base hover:scale-105 transition-transform"
          >
            &amp;
          </Link>
        </div>
      </nav>
    </header>
  );
}
