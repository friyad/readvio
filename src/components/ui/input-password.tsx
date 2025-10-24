"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, label, error, hint, id, ...props }, ref) => {
  const inputId = id ?? React.useId();
  const [visible, setVisible] = React.useState(false);
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
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={visible ? "text" : "password"}
          className={cn(
            "h-10 lg:h-11 2xl:h-12 w-full rounded-md border border-accent-blue/30 bg-white px-3 pr-9 text-sm text-primary-blue outline-none transition placeholder:text-primary-blue/40 hover:border-accent-blue/60 focus:border-primary-blue/60",
            error && "border-red-300 focus:border-red-400"
          )}
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-blue/60 hover:text-primary-blue cursor-pointer"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error ? (
        <p className="mt-1 text-[0.7rem] text-red-500">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-[0.7rem] text-primary-blue/60">{hint}</p>
      ) : null}
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
