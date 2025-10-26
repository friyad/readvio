import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Basic reading experience with limited access.",
    features: [
      "Access to selected e-books",
      "Community discussion",
      "Referral rewards",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "$9/mo",
    description: "Enjoy full access to our growing library.",
    features: [
      "Unlimited e-book and audiobook access",
      "Offline reading",
      "Priority support",
      "Referral rewards",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: "$19/mo",
    description: "Best for avid readers & advanced features.",
    features: [
      "Unlimited access",
      "Advanced reading analytics",
      "Early content releases",
      "VIP customer support",
      "All referral features",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-clean-white/50 flex flex-col items-center px-4 py-10 pb-20">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-blue font-instrument mb-2">
          Choose Your Plan
        </h1>
        <p className="text-primary-blue/80 mt-2 mb-10 max-w-2xl mx-auto text-base sm:text-lg">
          Explore flexible pricing for every kind of reader. Upgrade, downgrade,
          or cancel at any time.
        </p>
      </div>

      <div className="grid gap-8 w-full max-w-5xl grid-cols-1 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col border rounded-2xl bg-white shadow-md px-6 py-8 transition-all duration-200
              ${
                plan.popular
                  ? "border-primary-blue/70 bg-primary-blue/5 scale-105 shadow-lg z-10"
                  : "border-primary-blue/20"
              }
            `}
          >
            {plan.popular && (
              <span className="absolute top-4 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-primary-blue text-xs text-white font-semibold z-20 shadow-sm">
                Most Popular
              </span>
            )}
            <div className="mb-4 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-primary-blue">
                {plan.name}
              </h2>
              <div className="my-3">
                <span className="text-3xl font-bold text-primary-blue">
                  {plan.price}
                </span>
                {plan.price !== "Free" && (
                  <span className="text-primary-blue/60 text-sm ml-1">
                    /month
                  </span>
                )}
              </div>
              <p className="text-primary-blue/70 text-sm mb-6">
                {plan.description}
              </p>
              <ul className="text-left space-y-2 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-primary-blue/80 text-sm"
                  >
                    <Check className="size-4 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className="mt-6 w-full"
              variant={plan.popular ? "primary" : "outline"}
              size="lg"
            >
              {plan.price === "Free" ? "Get Started" : "Choose Plan"}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-12 w-full max-w-3xl mx-auto">
        <h3 className="text-lg font-bold text-primary-blue mb-2">
          Frequently Asked Questions
        </h3>
        <div className="divide-y divide-primary-blue/10 text-left bg-white rounded-xl shadow px-5">
          <details className="py-4 select-none cursor-pointer group">
            <summary className="font-semibold text-primary-blue outline-none group-open:text-primary-orange text-base">
              Can I cancel my subscription at any time?
            </summary>
            <p className="mt-2 text-primary-blue/80 text-sm">
              Yes, you can cancel, upgrade, or downgrade your plan whenever you
              want from your dashboard.
            </p>
          </details>
          <details className="py-4 select-none cursor-pointer group">
            <summary className="font-semibold text-primary-blue outline-none group-open:text-primary-orange text-base">
              Is there any refund policy?
            </summary>
            <p className="mt-2 text-primary-blue/80 text-sm">
              If you are not satisfied with our service, contact our support
              team within 14 days for a full refund.
            </p>
          </details>
          <details className="py-4 select-none cursor-pointer group">
            <summary className="font-semibold text-primary-blue outline-none group-open:text-primary-orange text-base">
              Do referral rewards apply on all plans?
            </summary>
            <p className="mt-2 text-primary-blue/80 text-sm">
              Yes! Earn referral points by inviting your friends on any of our
              pricing plans.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
