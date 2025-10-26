import { Button } from "@/components/ui/button";
import { Stars, UserStar } from "lucide-react";
import Link from "next/link";

export default function ReferralCta() {
  return (
    <section className="py-8 md:py-12 relative">
      <div className="rounded-2xl relative bg-linear-to-r from-orange-50 via-white to-primary-orange/20 border border-primary-orange/25 p-6 sm:p-12 flex items-center justify-between overflow-hidden">
        {/* Gradient, shapes, and decorative blobs */}
        <span
          aria-hidden="true"
          className="hidden md:block absolute -top-12 -left-16 h-60 w-60 bg-primary-orange/30 rounded-full blur-2xl opacity-60 animate-pulse"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-32 w-32 bg-secondary-orange/30 rounded-full blur-xl opacity-70"
        />

        {/* Icon illustration */}
        <div className="hidden lg:flex relative mr-10">
          <div className="flex items-center justify-center bg-white rounded-full shadow-2xl border-4 border-primary-orange w-28 h-28">
            <svg width="54" height="54" fill="none" viewBox="0 0 54 54">
              <circle
                cx="27"
                cy="27"
                r="26"
                stroke="#F48C06"
                strokeWidth="2"
                fill="#FFF7ED"
              />
              <path
                d="M17 36V21a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v15"
                stroke="#F48C06"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M27 32V16"
                stroke="#0077B6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="27" cy="13" r="2" fill="#F48C06" />
              <circle cx="19.5" cy="38.5" r="1.5" fill="#0077B6" />
              <circle cx="34.5" cy="38.5" r="1.5" fill="#0077B6" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 z-10">
          <h3 className="font-extrabold font-instrument text-primary-blue flex items-center gap-2">
            <span>Earn as you read</span>
            <span className="inline-flex items-center rounded-md bg-primary-orange/10 px-2 py-0.5 text-2xs md:text-xs font-semibold text-primary-orange ml-2">
              New
            </span>
          </h3>
          <p className="mt-2 text-xs xsm:text-sm lg:text-base text-primary-blue/80 max-w-2xl">
            Invite your friends to Readvio and collect{" "}
            <span className="font-semibold text-primary-orange">
              referral points
            </span>{" "}
            for discounts, unlock exclusive titles, and climb our reader
            leaderboard!
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-5">
            <Link href="/dashboard/link">
              <Button variant="orange" className="w-full sm:w-fit">
                <UserStar className="size-5 mr-2" />
                Refer a friend
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="outline" className="w-full sm:w-fit">
                <Stars className="size-5 mr-2" />
                View rewards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
