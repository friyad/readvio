import type { Metadata } from "next";
import Image from "next/image";
import bookImg from "@/assets/images/books-img.png";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-clean-white/50 flex flex-col items-center px-4 py-10 pb-20">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-blue font-instrument mb-2">
          About Us
        </h1>
        <p className="text-primary-blue/80 mt-2 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
          Discover our journey, our mission, and the passionate team behind our
          digital library platform.
        </p>
      </div>
      <div className="w-full max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-primary-blue mb-3">
            Our Mission
          </h2>
          <p className="text-primary-blue/70 text-base">
            We believe in making knowledge, stories, and learning accessible to
            all. Our mission is to empower readers worldwide by providing access
            to thousands of e-books and audiobooks, fostering a vibrant
            community of lifelong learners and book lovers.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src={bookImg}
            alt="Team mission illustration"
            className="w-full h-auto"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="rounded-xl border border-accent-blue/20 flex flex-col items-center px-6 py-8">
          <span className="mb-2 text-primary-orange text-3xl font-bold font-instrument">
            10K+
          </span>
          <span className="text-primary-blue font-semibold">
            Active Readers
          </span>
          <p className="mt-2 text-primary-blue/80 text-sm text-center">
            From all over the world, our growing community is passionate about
            reading and sharing knowledge.
          </p>
        </div>
        <div className="rounded-xl border border-accent-blue/20 flex flex-col items-center px-6 py-8">
          <span className="mb-2 text-primary-orange text-3xl font-bold font-instrument">
            5,000+
          </span>
          <span className="text-primary-blue font-semibold">
            E-Books & Audiobooks
          </span>
          <p className="mt-2 text-primary-blue/80 text-sm text-center">
            Our library is always expanding — discover your next favorite read
            or listen with us.
          </p>
        </div>
        <div className="rounded-xl border border-accent-blue/20 flex flex-col items-center px-6 py-8">
          <span className="mb-2 text-primary-orange text-3xl font-bold font-instrument">
            24/7
          </span>
          <span className="text-primary-blue font-semibold">Support</span>
          <p className="mt-2 text-primary-blue/80 text-sm text-center">
            Our dedicated team is here for you whenever you need help or have a
            question about our platform.
          </p>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto mt-14">
        <h2 className="text-primary-blue text-2xl font-bold mb-6 text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center border border-accent-blue/20 rounded-xl py-6 px-4">
            <Image
              src={bookImg}
              alt="Alex Chen"
              className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-primary-blue/20"
              width={500}
              height={500}
              priority
            />
            <h3 className="text-primary-blue font-bold text-lg">Alex Chen</h3>
            <span className="text-primary-orange text-sm font-semibold">
              Founder & CEO
            </span>
            <p className="mt-2 text-xs text-primary-blue/70 text-center">
              Visionary booklover and tech enthusiast, guiding our mission with
              passion.
            </p>
          </div>
          <div className="flex flex-col items-center border border-accent-blue/20 rounded-xl py-6 px-4">
            <Image
              src={bookImg}
              alt="Maya Rivera"
              className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-primary-blue/20"
              width={500}
              height={500}
              priority
            />
            <h3 className="text-primary-blue font-bold text-lg">Maya Rivera</h3>
            <span className="text-primary-orange text-sm font-semibold">
              Head of Content
            </span>
            <p className="mt-2 text-xs text-primary-blue/70 text-center">
              Curates the best reads and listens, ensuring a world-class
              selection for our users.
            </p>
          </div>
          <div className="flex flex-col items-center border border-accent-blue/20 rounded-xl py-6 px-4">
            <Image
              src={bookImg}
              alt="Ravi Patel"
              className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-primary-blue/20"
              width={500}
              height={500}
              priority
            />
            <h3 className="text-primary-blue font-bold text-lg">Ravi Patel</h3>
            <span className="text-primary-orange text-sm font-semibold">
              Lead Engineer
            </span>
            <p className="mt-2 text-xs text-primary-blue/70 text-center">
              Tech wizard improving platform performance and accessibility for
              everyone.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto mt-14 text-center">
        <h2 className="text-primary-blue font-bold mb-3 font-instrument">
          Join Our Story
        </h2>
        <p className="text-primary-blue/80 text-base mb-5">
          We&apos;re always looking for passionate readers, writers, and
          creators to join us on our mission.
        </p>
        <a
          href="/contact"
          className="inline-block bg-primary-orange hover:bg-primary-orange/90 transition text-white font-bold py-3 px-8 rounded-lg shadow font-instrument"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
