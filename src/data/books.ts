import type { Category } from "@/types/book";

export const categories: Category[] = [
  {
    id: "ebooks",
    name: "E-books",
    icon: "book-open",
    href: "/books?type=ebook",
    accentClass: "bg-accent-blue/10 text-primary-blue",
  },
  {
    id: "audiobooks",
    name: "Audiobooks",
    icon: "headphones",
    href: "/books?type=audio",
    accentClass: "bg-primary-orange/10 text-primary-blue",
  },
  {
    id: "learning",
    name: "Learning",
    icon: "lightbulb",
    href: "/books?type=learning",
    accentClass: "bg-primary-blue/10 text-primary-blue",
  },
  {
    id: "kids",
    name: "Kids & Teens",
    icon: "sparkles",
    href: "/books?audience=kids",
    accentClass: "bg-secondary-orange/10 text-primary-blue",
  },
];
