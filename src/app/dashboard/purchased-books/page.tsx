import BookCard from "@/app/books/_components/BookCard";
import { Book } from "@/types/book";
import { Metadata } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Purchased Books",
};

export async function getPurchasedBooksData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/purchased-books`,
      {
        credentials: "include",
        headers: await headers(),
      }
    );
    const data = await response.json();
    if (!data.data) {
      throw new Error(data?.message || "Failed to fetch purchased books");
    }
    return data.data as Book[];
  } catch (error: unknown) {
    return null;
  }
}

export default async function PurchasedBooksPage() {
  const purchasedBooksData = await getPurchasedBooksData();

  if (!purchasedBooksData) {
    return (
      <div className="flex items-center justify-center h-[40dvh]">
        <div className="text-2xl font-bold">
          Failed to fetch purchased books
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-extrabold text-primary-blue">Purchased Books</h2>
        <p className="text-primary-blue/70 text-sm">
          Manage your purchased books.
        </p>
      </div>

      {purchasedBooksData.length > 0 ? (
        <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {purchasedBooksData.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[40dvh]">
          <div className="text-2xl font-bold">No purchased books found</div>
        </div>
      )}
    </div>
  );
}
