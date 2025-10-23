import type { Metadata } from "next";
import Hero from "./_components/Hero";

export const metadata: Metadata = { title: "Readvio | Home" };

export default function Home() {
  return (
    <main className="">
      <Hero />
    </main>
  );
}
