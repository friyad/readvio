import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Library",
};

export default async function LibraryPage() {
  return (
    <div>
      <div className="bg-clean-white/50 relative h-[calc(45dvh-100px)] overflow-hidden grid items-center">
        <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 relative z-2 py-0">
          <div>
            <h3 className="mt-4 font-extrabold text-primary-blue font-instrument">
              Library
            </h3>

            <p className="mt-2 max-w-prose text-primary-blue/80">
              Explore our collection of e-books and audiobooks. Earn referral
              points as you read.
            </p>
          </div>
        </section>

        <div className="absolute inset-0 z-1 h-full w-full bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>

        <div className="absolute top-0 z-[-1] h-full w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,#e87a3021_0%,#e87a3000_50%,#e87a3000_100%)]"></div>
      </div>

      <section className="py-8">
        <div className="flex items-center justify-between flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold">Library</h2>
            <p className="text-primary-blue/70 text-sm">Manage your library.</p>
          </div>
          <div>
            <Button variant="outline">Add book</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
