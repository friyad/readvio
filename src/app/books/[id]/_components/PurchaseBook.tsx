"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorExtractor";
import { useRouter } from "next/navigation";

interface PurchaseBookProps {
  bookId: string;
}

const PurchaseBook = ({ bookId }: PurchaseBookProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase`, {
        method: "POST",
        body: JSON.stringify({ bookId }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.data)
        throw new Error(data.message || "Failed to purchase book");
      toast.success("Book purchased successfully");
      router.replace("/dashboard/purchased-books");
    } catch (error: unknown) {
      if (extractErrorMessage(error) === "Unauthorized") {
        router.push("/login");
        toast.error("Please login to purchase a book");
        return;
      }
      toast.error(extractErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="orange"
      onClick={handlePurchase}
      className="min-w-40 w-full xsm:w-fit"
      disabled={isLoading}
      loading={isLoading}
    >
      Buy now
    </Button>
  );
};

export default PurchaseBook;
