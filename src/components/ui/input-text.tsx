import * as React from "react";
import { cn } from "@/lib/utils";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  inputClassName?: string;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, label, error, hint, id, inputClassName, ...props }, ref) => {
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
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 lg:h-11 2xl:h-12 w-full rounded-md border border-accent-blue/30 bg-white px-3 text-sm text-primary-blue outline-none transition placeholder:text-primary-blue/40 hover:border-accent-blue/60 focus:border-primary-blue/60",
            error && "border-red-300 focus:border-red-400",
            inputClassName
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
TextInput.displayName = "TextInput";

export default TextInput;
