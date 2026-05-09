export type MediaSource =
  | { kind: "cloudinary"; publicId: string }
  | { kind: "url"; url: string };

export type Episode = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  durationLabel?: string;
  thumbnail: MediaSource;
  media: MediaSource;
  mediaType: "image" | "video";
};

export type Show = {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  year: string;
  badge?: string;
  matchPercent?: number;
  rating?: string;
  durationLabel?: string;
  cast?: string[];
  genres?: string[];
  poster: MediaSource;
  backdrop: MediaSource;
  trailer?: MediaSource;
  episodes: Episode[];
  slideshow?: {
    musicSrc: string;
    photoDuration?: number;
    musicStartTime?: number;
    videoDuration?: number;
  };
};

export type Row = {
  id: string;
  title: string;
  showIds: string[];
};

export type Profile = {
  id: string;
  name: string;
  color: string;
  avatarText: string;
};
