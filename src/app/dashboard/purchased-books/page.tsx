import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchased Books",
};

export default function PurchasedBooksPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-extrabold text-primary-blue">Purchased Books</h2>
        <p className="text-primary-blue/70 text-sm">
          Manage your purchased books.
        </p>
      </div>
    </div>
  );
}
