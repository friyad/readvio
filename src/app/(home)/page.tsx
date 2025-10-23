import type { Metadata } from "next";
import Hero from "./_components/Hero";
import StatsStrip from "./_components/StatsStrip";
import CategoryTiles from "./_components/CategoryTiles";
import { sections } from "@/data/books";
import BooksSection from "./_components/BooksSection";

export const metadata: Metadata = { title: "Readvio | Home" };

export default function Home() {
  return (
    <main className="">
      <Hero />
      <StatsStrip />
      <CategoryTiles />

      {/* Book Sections */}
      {sections.map((s) => (
        <BooksSection key={s.id} section={s} />
      ))}
    </main>
  );
}
