"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "orange"
  | "gradient";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-blue text-white hover:bg-primary-blue/90 focus:ring-primary-blue",
  secondary:
    "bg-white text-primary-blue border border-primary-blue/20 hover:bg-primary-blue/5 focus:ring-primary-blue/30",
  outline:
    "bg-transparent border border-primary-blue/50 text-primary-blue hover:bg-primary-blue/10 focus:ring-primary-blue/30",
  ghost:
    "bg-transparent text-primary-blue hover:bg-primary-blue/10 focus:ring-primary-blue/20 border border-transparent",
  orange:
    "bg-primary-orange text-white hover:bg-secondary-orange focus:ring-primary-orange",
  gradient:
    "bg-gradient-to-l from-primary-orange via-secondary-orange to-primary-blue text-white hover:brightness-110 focus:ring-secondary-orange/50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-6 text-lg",
};

const MotionButton = motion.button;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      type = "button",
      asChild,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <AnimatePresence initial={false}>
        <MotionButton
          {...(props as any)}
          ref={ref}
          type={type}
          className={cn(
            "relative inline-flex items-center font-semibold rounded-md shadow-sm outline-none transition-all duration-200 cursor-pointer",
            variantClasses[variant],
            sizeClasses[size],
            isDisabled ? "opacity-60 cursor-not-allowed" : "",
            className
          )}
          disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          {...props}
        >
          {loading ? (
            <motion.span
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center"
              initial={{ opacity: 0, rotate: -60 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 60 }}
            >
              <Spinner
                color={
                  variant === "orange" || variant === "gradient"
                    ? "white"
                    : "primary-blue"
                }
              />
            </motion.span>
          ) : (
            leftIcon && (
              <span className="mr-2 flex items-center">{leftIcon}</span>
            )
          )}

          <span
            className={cn(
              "mx-auto transition-all duration-100 flex items-center",
              loading ? "opacity-50" : ""
            )}
          >
            {children}
          </span>

          {rightIcon && !loading && (
            <span className="ml-2 flex items-center">{rightIcon}</span>
          )}
        </MotionButton>
      </AnimatePresence>
    );
  }
);
Button.displayName = "Button";

function Spinner({ color }: { color?: string }) {
  const colorClass = cn(
    "h-4 w-4 animate-spin",
    color === "white"
      ? "text-white"
      : color === "primary-blue"
      ? "text-primary-blue"
      : "text-primary-blue"
  );

  return (
    <motion.svg
      className={colorClass}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </motion.svg>
  );
}
