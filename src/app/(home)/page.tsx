import type { Metadata } from "next";
import Hero from "./_components/Hero";
import StatsStrip from "./_components/StatsStrip";

export const metadata: Metadata = { title: "Readvio | Home" };

export default function Home() {
  return (
    <main className="">
      <Hero />
      <StatsStrip />
    </main>
  );
}
