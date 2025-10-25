"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface TableFooterProps {
  totalPages: number;
  currentPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
const TableFooter = ({
  totalPages,
  currentPage,
  page,
  setPage,
}: TableFooterProps) => {
  return (
    <div className="w-full flex items-center justify-between bg-clean-white/60 py-3 px-5">
      <p className="text-primary-blue/70 text-xs mxl:text-sm">
        <span className="hidden md:inline">Showing</span> {currentPage} of{" "}
        {totalPages} <span className="hidden md:inline">results</span>
      </p>

      <div className="flex h-9 mxl:h-11 items-center gap-3">
        <button
          aria-label="Previous"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className={cn(
            "text-primary-blue/60 hover:text-primary-blue transition-colors cursor-pointer hover:bg-primary-blue/10 rounded-lg size-8 mxl:size-9 flex items-center justify-center",
            page === 1 && "pointer-events-none opacity-40"
          )}
        >
          <ChevronLeft className="size-4" />
        </button>

        {page >= totalPages - 2 && totalPages > 4 && (
          <>
            <button
              onClick={() => setPage(1)}
              className="text-primary-blue/60 hover:text-primary-blue text-xs mxl:text-sm cursor-pointer"
            >
              1
            </button>
            <span className="text-primary-blue/60 text-xs mxl:text-sm">
              ....
            </span>
          </>
        )}

        <div className="size-[30px] grid place-items-center font-semibold rounded-md bg-primary-blue/10 text-primary-blue text-xs mxl:text-sm">
          {page}
        </div>

        {page + 1 <= totalPages && (
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="text-primary-blue/60 hover:text-primary-blue text-xs mxl:text-sm cursor-pointer"
          >
            {page + 1}
          </button>
        )}

        {page + 2 < totalPages && (
          <span className="text-primary-blue/60 text-xs mxl:text-sm">....</span>
        )}

        {totalPages > page + 1 && (
          <button
            onClick={() => setPage(totalPages)}
            className={cn(
              "text-primary-blue/60 hover:text-primary-blue text-xs mxl:text-sm cursor-pointer",
              page === totalPages && "opacity-100 text-white"
            )}
          >
            {totalPages}
          </button>
        )}

        <button
          aria-label="Next"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className={cn(
            "text-primary-blue/60 hover:text-primary-blue transition-colors cursor-pointer hover:bg-primary-blue/10 rounded-lg size-8 mxl:size-9 flex items-center justify-center",
            page === totalPages && "pointer-events-none opacity-40"
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default TableFooter;
