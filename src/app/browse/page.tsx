import { Nav } from "@/components/Nav";
import { Billboard } from "@/components/Billboard";
import { Row } from "@/components/Row";
import { featuredShowId, getShow, rows } from "@/data/shows";

export default function Browse() {
  const featured = getShow(featuredShowId);
  if (!featured) return null;

  return (
    <main className="min-h-[100dvh] bg-black text-white">
      <Nav />
      <Billboard show={featured} />
      <div className="-mt-20 sm:-mt-32 relative z-10 pb-24">
        {rows.map((row) => (
          <Row key={row.id} row={row} />
        ))}
        <footer className="px-4 sm:px-8 lg:px-14 mt-16 text-center text-white/40 text-xs sm:text-sm">
          <p>S&amp;S — Our Story, Now Streaming.</p>
          <p className="mt-2">For Sanskriti, on year two.</p>
        </footer>
      </div>
    </main>
  );
}
