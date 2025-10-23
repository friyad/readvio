import type { Metadata } from "next";
import Hero from "./_components/Hero";
import StatsStrip from "./_components/StatsStrip";
import CategoryTiles from "./_components/CategoryTiles";

export const metadata: Metadata = { title: "Readvio | Home" };

export default function Home() {
  return (
    <main className="">
      <Hero />
      <StatsStrip />
      <CategoryTiles />
    </main>
  );
}
