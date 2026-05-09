import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { DetailView } from "@/components/DetailView";
import { getShow, shows } from "@/data/shows";

export function generateStaticParams() {
  return shows.map((s) => ({ showId: s.id }));
}

export default async function ShowPage({
  params,
}: {
  params: Promise<{ showId: string }>;
}) {
  const { showId } = await params;
  const show = getShow(showId);
  if (!show) notFound();

  const related = shows.filter((s) => s.id !== show.id).slice(0, 4);

  return (
    <>
      <Nav />
      <DetailView show={show} related={related} />
    </>
  );
}
