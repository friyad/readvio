import { Metadata } from "next";
import TopBanner from "./_components/TopBanner";
import BookCard from "./_components/BookCard";
import { allBooks } from "@/data/books";

export const metadata: Metadata = {
  title: "Books",
};

export default function BooksPage() {
  return (
    <div className="">
      <TopBanner />

      <section className="py-8">
        <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
