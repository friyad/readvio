import type { Book, BookSection, Category } from "@/types/book";

const cover = (seed: number) =>
  `https://picsum.photos/seed/readvio-${seed}/320/480`;

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

const makeBook = (i: number): Book => ({
  id: `book-${i}`,
  title: `The Readvio Story ${i}`,
  author: ["Alex Morgan", "Sam Taylor", "Jordan Lee", "Casey Reed"][i % 4],
  coverImageUrl: cover(i),
  rating: (i % 5) + 1,
  ratingCount: 120 + i * 3,
  tags: ["bestseller", "new"].slice(0, (i % 2) + 1),
  description: "A captivating journey through knowledge and imagination.",
  price: { currency: "USD", amount: 999, formatted: "$9.99" },
});

export const newReleases: BookSection = {
  id: "new",
  title: "New releases in print",
  ctaHref: "/books?sort=new",
  ctaLabel: "View all",
  books: Array.from({ length: 12 }, (_, i) => makeBook(i + 1)),
};

export const editorsPicks: BookSection = {
  id: "editors",
  title: "Editors' best books of the month",
  ctaHref: "/books?filter=editors",
  ctaLabel: "See picks",
  books: Array.from({ length: 10 }, (_, i) => makeBook(i + 30)),
};

export const bestSellers: BookSection = {
  id: "bestsellers",
  title: "Best sellers on Readvio",
  ctaHref: "/books?sort=top",
  ctaLabel: "Top charts",
  books: Array.from({ length: 12 }, (_, i) => makeBook(i + 60)),
};

export const sections: BookSection[] = [newReleases, editorsPicks, bestSellers];
