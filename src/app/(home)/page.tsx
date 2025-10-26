import type { Metadata } from "next";
import Hero from "./_components/Hero";
import StatsStrip from "./_components/StatsStrip";
import CategoryTiles from "./_components/CategoryTiles";
import BooksSection from "./_components/BooksSection";
import ReferralCta from "./_components/ReferralCta";
import SiteFooter from "@/components/footer/site-footer";
import { BookSection } from "@/types/book";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Home" };

async function getBooksSections() {
  const defaultSections: BookSection[] = [
    {
      id: "new",
      title: "New releases in print",
      ctaHref: "/books?sort=new",
      ctaLabel: "View all",
      books: [],
    },
    {
      id: "editors",
      title: "Editors' best books of the month",
      ctaHref: "/books?filter=editors",
      ctaLabel: "See picks",
      books: [],
    },
    {
      id: "bestsellers",
      title: "Best sellers on Readvio",
      ctaHref: "/books?sort=top",
      ctaLabel: "Top charts",
      books: [],
    },
  ];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      cache: "no-store",
    });
    const data = await response.json();
    if (data?.message || !Array.isArray(data)) {
      throw new Error(data?.message || "Failed to fetch books");
    }
    defaultSections[0].books = data.slice(0, 12);
    defaultSections[1].books = data.slice(12, 22);
    defaultSections[2].books = data.slice(22, 34);
    return defaultSections;
  } catch (error: unknown) {
    return defaultSections;
  }
}

export default async function Home() {
  const sections = await getBooksSections();

  return (
    <main className="">
      <Hero />
      <StatsStrip />
      <CategoryTiles />

      {/* Book Sections */}
      {sections?.map((s) => (
        <BooksSection key={s.id} section={s} />
      ))}

      <ReferralCta />
      <SiteFooter />
    </main>
  );
}
