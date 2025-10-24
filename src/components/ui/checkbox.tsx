import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | React.ReactNode;
  error?: string;
  boxClassName?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, boxClassName, ...props }, ref) => {
    return (
      <>
        <label
          className={cn(
            "inline-flex items-center gap-2 text-primary-blue/80",
            className
          )}
        >
          <input type="checkbox" className="hidden peer" ref={ref} {...props} />
          <div
            className={cn(
              "relative overflow-hidden size-5 rounded-sm border-[1.5px] flex items-center justify-center peer-checked:bg-primary-blue bg-transparent border-primary-blue peer-checked:*:translate-y-0",
              boxClassName
            )}
          >
            <Check
              className="size-3 translate-y-3 text-white transition-all duration-200"
              strokeWidth={4}
            />
          </div>

          {typeof label === "string" ? <span>{label}</span> : label}
        </label>

        {error ? (
          <p className="mt-1 text-[0.7rem] text-red-500">{error}</p>
        ) : null}
      </>
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
