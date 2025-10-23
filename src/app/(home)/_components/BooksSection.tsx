"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import type { BookSection } from "@/types/book";
import Link from "next/link";
import BookCard from "./BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface BooksSectionProps {
  section: BookSection;
}

const BooksSection = ({ section: s }: BooksSectionProps) => {
  return (
    <section key={s.id} className="py-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-primary-blue">{s.title}</h2>

        {s.ctaHref && s.ctaLabel ? (
          <Link
            href={s.ctaHref}
            className="text-sm font-medium text-primary-blue/80 hover:text-primary-blue flex justify-center items-center"
          >
            <span className="whitespace-nowrap">{s.ctaLabel}</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            440: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          navigation={{
            nextEl: `.books-section-${s.id}-next`,
            prevEl: `.books-section-${s.id}-prev`,
          }}
          scrollbar={{
            el: `.books-section-${s.id}-scrollbar`,
            draggable: true,
          }}
          modules={[Navigation, Scrollbar]}
          className=""
        >
          {s.books.map((b) => (
            <SwiperSlide key={b.id} className="">
              <BookCard book={b} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left and right arrows for desktop/tablet */}
        <button
          type="button"
          className={`books-section-${s.id}-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center rounded-full bg-white/90 backdrop-blur-2xl shadow hover:bg-clean-white transition cursor-pointer disabled:bg-white/60 size-11 2xl:size-12`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          className={`books-section-${s.id}-next absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center rounded-full bg-white/90 backdrop-blur-2xl shadow hover:bg-clean-white transition cursor-pointer disabled:bg-white/60 size-11 2xl:size-12`}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Swiper Scrollbar for mobile devices */}
        <div
          className={`books-section-${s.id}-scrollbar mt-2 mx-3 md:hidden`}
          style={{ height: 6 }}
        ></div>
      </div>
    </section>
  );
};

export default BooksSection;
