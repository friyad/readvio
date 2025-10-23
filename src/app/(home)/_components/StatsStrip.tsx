"use client";

import { motion } from "framer-motion";

export default function StatsStrip() {
  const stats = [
    { value: "25k+", label: "Titles" },
    { value: "1.2k+", label: "Authors" },
    { value: "4.9", label: "Avg. rating" },
    { value: "Zero", label: "Ads while reading" },
  ];

  return (
    <section>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 xsm:grid-cols-2 lg:grid-cols-4 gap-6 text-primary-blue">
        {stats.map((s, idx) => (
          <motion.div
            key={s.label}
            className="group relative flex flex-col items-center justify-center rounded-xl bg-white border border-secondary-orange py-6 shadow-md lg:shadow-lg hover:shadow-sm transition-shadow duration-300 group"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
          >
            <p className="mb-1 text-primary-orange font-extrabold font-instrument text-3xl md:text-4xl">
              {s.value}
            </p>
            <p className="text-xs font-medium text-primary-blue/70 tracking-wide uppercase letter-spacing-wide font-inter">
              {s.label}
            </p>
            <div className="mt-3 h-0.5 w-8 rounded-full bg-primary-blue/70"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
