import * as React from "react";
import { cn } from "@/lib/utils";

export type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className={cn("w-full", className)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="mb-1 block text-xs font-medium text-primary-blue"
          >
            {label}
          </label>
        ) : null}
        <input
          type="number"
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 lg:h-11 2xl:h-12 w-full rounded-md border border-accent-blue/30 bg-white px-3 text-sm text-primary-blue outline-none transition placeholder:text-primary-blue/40 hover:border-accent-blue/60 focus:border-primary-blue/60",
            error && "border-red-300 focus:border-red-400"
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-[0.7rem] text-red-500">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-[0.7rem] text-primary-blue/60">{hint}</p>
        ) : null}
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

export default NumberInput;
