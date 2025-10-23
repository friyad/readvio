export type BookId = string;

export type Price = {
  currency: string;
  amount: number;
  formatted: string;
};

export type Book = {
  id: BookId;
  title: string;
  author: string;
  coverImageUrl: string;
  rating: number;
  ratingCount: number;
  tags?: string[];
  description?: string;
  price?: Price;
};

export type BookSection = {
  id: string;
  title: string;
  books: Book[];
  ctaHref?: string;
  ctaLabel?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  href: string;
  accentClass?: string;
};
