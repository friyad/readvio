import { Metadata } from "next";
import TopBanner from "./_components/TopBanner";
import BookCard from "./_components/BookCard";
import { allBooks } from "@/data/books";

export const metadata: Metadata = {
  title: "Books",
};

async function getBooks() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books: ", error);
    return [];
  }
}

export default async function BooksPage() {
  const books = await getBooks();
  console.log("Books: ", books);

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
