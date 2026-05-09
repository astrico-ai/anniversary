import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
  className?: string;
};

const sizeMap = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-7xl",
  xl: "text-[clamp(6rem,22vw,18rem)] leading-[0.85]",
} as const;

export function Logo({ size = "md", glow = false, className }: Props) {
  return (
    <span
      className={cn(
        "font-display text-brand select-none inline-block",
        "tracking-[-0.04em]",
        "[transform:scaleY(1.18)] origin-bottom",
        "drop-shadow-[0_6px_24px_rgba(229,9,20,0.35)]",
        sizeMap[size],
        glow && "brand-glow",
        className,
      )}
      aria-label="S and S"
    >
      S<span className="mx-[-0.04em]">&amp;</span>S
    </span>
  );
}
