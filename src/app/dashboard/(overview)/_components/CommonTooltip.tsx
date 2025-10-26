"use client";

import { cn } from "@/lib/utils";
import { formatDateDaily } from "@/utils/date";

interface Props {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
    format: string | number | undefined;
  }>;
  label?: string;
  className?: string;
}

const CommonTooltip = ({ active, payload, label, className }: Props) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-md border border-gray-200 bg-white shadow-sm">
      <p className="px-4 py-2.5 font-semibold">
        Date: {formatDateDaily(label)}
      </p>
      <div className="grid">
        {payload.map((entry, index) => {
          const value = entry.value;

          // Handle formatting based on the format string e.g "left_%" or "right_$"
          const formatHas =
            typeof entry.format === "string" && entry.format.split("_");
          const finalValue =
            formatHas && formatHas.length > 1
              ? formatHas[0] === "left"
                ? value + formatHas[1]
                : formatHas[1] + value
              : value; // Fallback to just the value if no format is specified

          return (
            <div
              key={`item-${index}`}
              className={cn(
                "flex items-center gap-2 border-b px-4 py-1 first:border-t last:border-b-0 border-accent-blue/20",
                payload.length === 1 && "py-2",
                className
              )}
            >
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="flex-1 text-sm">{entry.name}</span>
              <span className="text-sm font-medium">{finalValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommonTooltip;
