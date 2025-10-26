import { Metadata } from "next";
import TopBanner from "./_components/TopBanner";
import BookCard from "./_components/BookCard";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Books",
};

export async function getBooks() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
    const data = await response.json();
    if (data?.message || !Array.isArray(data)) {
      throw new Error(data?.message || "Failed to fetch books");
    }
    return data as Book[];
  } catch (error: unknown) {
    return null;
  }
}

export default async function BooksPage() {
  const books = await getBooks();

  if (!books) {
    return (
      <div>
        <TopBanner />
        <div className="flex flex-col justify-center items-center min-h-[40dvh]">
          <p className="text-primary-blue/70 text-sm mb-4">
            No books found. Please try again later.
          </p>
          <Link href="/">
            <Button variant="outline">Go to home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopBanner />

      <section className="py-8">
        {books.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[40dvh] col-span-full">
            <p className="text-primary-blue/70 text-sm mb-4">No books found.</p>
            <Link href="/">
              <Button variant="outline">Go to home</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
