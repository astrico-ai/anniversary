# S&S — Our Story, Now Streaming

A streaming-style anniversary site for Sanuj & Sanskriti (year two).

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Cloudinary for media (optional; falls back to placeholders until configured)

## Run locally
```bash
npm run dev
```
Visit http://localhost:3000

## Add your content

### 1. Cloudinary
1. Sign up free at https://cloudinary.com
2. Copy your **Cloud Name** from the dashboard
3. Create `.env.local`:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   ```
4. Upload media in the Cloudinary dashboard. Each file gets a `public_id` (e.g., `lisbon/cover`, `first-date/dinner-1`). Folder slashes are part of the id.

### 2. Edit shows
Open `src/data/shows.ts`. Replace placeholder media with Cloudinary references:
```ts
poster:   { kind: "cloudinary", publicId: "anniversary/poster" },
backdrop: { kind: "cloudinary", publicId: "anniversary/backdrop" },
trailer:  { kind: "cloudinary", publicId: "anniversary/trailer" }, // optional, autoplays on billboard
```

For each "show," add as many episodes as you want:
```ts
episodes: [
  {
    id: "ep-1",
    title: "Day Zero",
    description: "The story behind this moment.",
    date: "2024-05-10",
    durationLabel: "Photo",
    thumbnail: { kind: "cloudinary", publicId: "first-date/cover" },
    media:     { kind: "cloudinary", publicId: "first-date/cover" },
    mediaType: "image", // or "video"
  },
]
```

### 3. Edit rows / featured show
Same file — `rows` controls the order on the home page; `featuredShowId` controls the billboard hero.

### 4. Intro sound (optional)
Drop a 1–3 second cinematic stinger at `public/sound/intro.mp3`. Splash plays it on first load. See `public/sound/README.txt` for sources.

## Deploy to Vercel
```bash
npx vercel
```
Add the env var in the Vercel dashboard:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = your cloud name

Vercel gives you a public URL (you can rename in project settings).

## Structure
- `src/app/page.tsx` — splash + profile picker
- `src/app/browse/page.tsx` — home (billboard + rows)
- `src/app/browse/[showId]/page.tsx` — detail page
- `src/components/` — Logo, Splash, ProfilePicker, Nav, Billboard, Row, Card, DetailView
- `src/data/shows.ts` — your content
- `src/data/profiles.ts` — Sanuj / Sanskriti / Us profiles
- `src/lib/cloudinary.ts` — image/video URL helpers
