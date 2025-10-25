import { Book } from "@/types/book";
import Link from "next/link";
import BookCard from "../../_components/BookCard";

interface RelatedBooksProps {
  allBooks: Book[];
  book: Book;
}

const RelatedBooks = ({ allBooks, book }: RelatedBooksProps) => {
  const related = allBooks
    .filter(
      (b) =>
        b.id !== book.id &&
        (b.author === book.author ||
          b.tags?.some((t) => book.tags?.includes(t) ?? false))
    )
    .slice(0, 8);

  if (related.length === 0) return null;

  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-lg font-semibold text-primary-blue md:text-xl">
          You may also like
        </h2>
        <Link
          href="/books"
          className="text-sm font-medium text-primary-blue/80 hover:text-primary-blue"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {related.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </section>
  );
};

export default RelatedBooks;
