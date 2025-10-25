import { Ratings } from "@/components/ui/ratings";
import { cn } from "@/lib/utils";
import type { Book } from "@/types/book";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  const fullStars = Math.floor(book.rating);
  const hasHalf = book.rating - fullStars >= 0.5;

  return (
    <Link
      href={`/books/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-accent-blue/20 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow w-full"
    >
      <div className="relative aspect-20/18 w-full overflow-hidden bg-clean-white">
        <Image
          src={book.coverImageUrl}
          alt={book.title}
          width={450}
          height={600}
          className="w-full h-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="min-h-10">
          <h3 className="line-clamp-2 text-sm font-semibold text-primary-blue">
            {book.title}
          </h3>
          <p className="text-xs text-primary-blue/70">{book.author}</p>
        </div>

        <div className="flex items-center gap-1 text-primary-orange">
          <Ratings rating={book.rating} ratingCount={book.ratingCount} />
        </div>

        <div className="mt-auto flex items-center justify-between">
          {book.price ? (
            <span className="text-sm font-semibold text-primary-blue">
              {book.price.formatted}
            </span>
          ) : (
            <span className="text-sm font-semibold text-primary-blue">
              Free
            </span>
          )}

          <span className="rounded-full bg-primary-orange/10 px-2 py-0.5 text-[0.7rem] font-medium text-primary-orange">
            {book.tags?.[0] ?? "book"}
          </span>
        </div>
      </div>
    </Link>
  );
}
