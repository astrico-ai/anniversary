import type { MediaSource } from "./types";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

type ImageOpts = {
  width?: number;
  height?: number;
  quality?: "auto" | number;
  crop?: "fill" | "fit" | "thumb" | "scale";
  gravity?: "auto" | "face" | "center";
};

export function imageUrl(source: MediaSource, opts: ImageOpts = {}): string {
  if (source.kind === "url") return source.url;
  if (!CLOUD) return placeholder(opts.width ?? 800, opts.height ?? 450);
  const tx = [
    "f_auto",
    `q_${opts.quality ?? "auto"}`,
    opts.width && `w_${opts.width}`,
    opts.height && `h_${opts.height}`,
    opts.crop && `c_${opts.crop}`,
    opts.gravity && `g_${opts.gravity}`,
  ]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${tx}/${source.publicId}`;
}

type VideoOpts = {
  width?: number;
  aspectRatio?: "16:9" | "9:16" | "4:3" | "1:1";
  crop?: "fill" | "fit" | "scale" | "pad";
  gravity?: "auto" | "center" | "face";
  duration?: number; // trim to N seconds via du_N
};

export function videoUrl(source: MediaSource, opts: VideoOpts = {}): string {
  if (source.kind === "url") return source.url;
  if (!CLOUD) return "";
  const tx = [
    "f_auto",
    "q_auto",
    opts.width && `w_${opts.width}`,
    opts.aspectRatio && `ar_${opts.aspectRatio}`,
    opts.crop && `c_${opts.crop}`,
    opts.gravity && `g_${opts.gravity}`,
    opts.duration && `du_${opts.duration}`,
  ]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${tx}/${source.publicId}.mp4`;
}

export function videoPosterUrl(source: MediaSource, opts: ImageOpts = {}) {
  if (source.kind === "url") return source.url;
  if (!CLOUD) return placeholder(opts.width ?? 800, opts.height ?? 450);
  const tx = [
    "f_auto",
    `q_${opts.quality ?? "auto"}`,
    opts.width && `w_${opts.width}`,
    opts.height && `h_${opts.height}`,
    opts.crop && `c_${opts.crop}`,
    "so_auto",
  ]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${tx}/${source.publicId}.jpg`;
}

function placeholder(w: number, h: number) {
  return `https://placehold.co/${w}x${h}/141414/e50914?text=S%26S&font=oswald`;
}

export function isCloudinaryConfigured() {
  return Boolean(CLOUD);
}
