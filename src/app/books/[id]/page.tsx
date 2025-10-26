import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
import type { Book, BookId } from "@/types/book";
import { Button } from "@/components/ui/button";
import RelatedBooks from "./_components/RelatedBooks";
import { Ratings } from "@/components/ui/ratings";
import PurchaseBook from "./_components/PurchaseBook";
import { Metadata } from "next";
import { getBooks } from "../page";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { id: string };
};

async function getBookById(id: BookId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`
    );
    const data = await response.json();
    if (data?.message || !data) {
      throw new Error(data?.message || "Failed to fetch book");
    }
    return data as Book;
  } catch (error: unknown) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const book = await getBookById(id);
  return {
    title: book ? `${book.title}` : "Book",
  };
}

export default async function BookDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const book = await getBookById(id);
  const allBooks = await getBooks();

  if (!book) {
    return (
      <div>
        <div className="flex flex-col justify-center items-center min-h-[40dvh]">
          <p className="text-primary-blue/70 text-sm mb-4">Book not found.</p>
          <Link href="/books">
            <Button variant="outline">Go to books</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        {/* Cover */}
        <div className="rounded-xl border border-accent-blue/20 bg-white p-3 shadow-sm">
          <div className="relative aspect-20/18 w-full overflow-hidden rounded-md bg-clean-white">
            <Image
              src={book.coverImageUrl}
              alt={book.title}
              width={640}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {book.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary-orange/10 px-2 py-0.5 text-[0.7rem] font-medium text-primary-orange"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-extrabold text-primary-blue md:text-3xl">
            {book.title}
          </h1>
          <p className="text-sm text-primary-blue/80">by {book.author}</p>

          <div className="flex items-center gap-1 text-primary-orange">
            <Ratings rating={book.rating} ratingCount={book.ratingCount} />
          </div>

          <div className="mt-2 flex items-center gap-4">
            <span className="text-xl font-extrabold text-primary-blue">
              {book.price ? book.price.formatted : "Free"}
            </span>
          </div>

          <div className="mt-1 text-sm text-primary-blue/80">
            {book.description ??
              "A beautifully crafted title available on Readvio."}
          </div>

          <div className="mt-4 flex xsm:flex-row flex-col flex-wrap gap-3">
            <PurchaseBook bookId={"68fd2942b1204988ec4f9332"} />
            <Button variant="outline" className="min-w-40 w-full xsm:w-fit">
              <Heart className="mr-2 h-4 w-4" /> Add to wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Related */}
      <RelatedBooks allBooks={allBooks} book={book} />
    </div>
  );
}
