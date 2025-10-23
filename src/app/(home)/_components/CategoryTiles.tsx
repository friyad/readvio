import { categories } from "@/data/books";
import { BookOpen, Headphones, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  "book-open": <BookOpen className="h-6 w-6" />,
  headphones: <Headphones className="h-6 w-6" />,
  lightbulb: <Lightbulb className="h-6 w-6" />,
  sparkles: <Sparkles className="h-6 w-6" />,
};

export default function CategoryTiles() {
  return (
    <section className="w-full py-5">
      <h2 className="mb-4 text-primary-blue">Featured Categories</h2>

      <div className="grid gap-5 grid-cols-1 xsm:grid-cols-2 md:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className={`group flex items-center gap-3 rounded-lg border border-accent-blue/30 p-4 transition hover:-translate-y-0.5 hover:shadow ${
              c.accentClass ?? ""
            }`}
          >
            <span className="text-primary-blue/80 group-hover:text-primary-blue">
              {iconMap[c.icon]}
            </span>
            <span className="text-sm font-semibold text-primary-blue">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
