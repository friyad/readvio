"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Align = "start" | "end" | "center";

export type MenuProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openOnHover?: boolean;
  align?: Align;
  offset?: number;
  panelClassName?: string;
};

function composeEventHandlers<
  E extends React.SyntheticEvent<any>,
  H extends (event: E) => void
>(theirHandler?: H, ourHandler?: H) {
  return (event: E) => {
    theirHandler?.(event);
    if (!event.defaultPrevented) {
      ourHandler?.(event);
    }
  };
}

export function Menu({
  trigger,
  children,
  open,
  onOpenChange,
  openOnHover = false,
  align = "end",
  offset = 8,
  panelClassName,
}: MenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const setOpen = (next: boolean) =>
    isControlled ? onOpenChange?.(next) : setUncontrolledOpen(next);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const alignmentClass =
    align === "start"
      ? "left-0"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "right-0";

  const element = trigger as React.ReactElement<any>;
  const clonedTrigger = React.isValidElement(trigger)
    ? React.cloneElement(element, {
        onClick: composeEventHandlers<any, any>(
          (trigger as any).props?.onClick,
          openOnHover ? undefined : () => setOpen(!isOpen)
        ),
        onPointerEnter: composeEventHandlers<any, any>(
          (trigger as any).props?.onPointerEnter,
          openOnHover ? () => setOpen(true) : undefined
        ),
        onPointerLeave: composeEventHandlers<any, any>(
          (trigger as any).props?.onPointerLeave,
          openOnHover
            ? () => {
                if (hoverTimeoutRef.current) {
                  window.clearTimeout(hoverTimeoutRef.current);
                }
                hoverTimeoutRef.current = window.setTimeout(
                  () => setOpen(false),
                  80
                );
              }
            : undefined
        ),
        "aria-expanded": isOpen,
        "aria-haspopup": "menu",
      } as any)
    : trigger;

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onPointerEnter={() => {
        if (!openOnHover) return;
        if (hoverTimeoutRef.current)
          window.clearTimeout(hoverTimeoutRef.current);
        setOpen(true);
      }}
      onPointerLeave={() => {
        if (!openOnHover) return;
        if (hoverTimeoutRef.current)
          window.clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = window.setTimeout(() => setOpen(false), 80);
      }}
    >
      {clonedTrigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute z-50 ${alignmentClass}`}
            style={{ marginTop: offset }}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            role="menu"
          >
            <div
              className={`min-w-48 overflow-hidden rounded-md border bg-white text-foreground shadow-xl ${
                panelClassName ?? ""
              }`}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export type MenuItemProps = {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
};

export function MenuItem({
  children,
  onSelect,
  disabled,
  className,
  leading,
  trailing,
  href,
  target,
  rel,
}: MenuItemProps) {
  const commonClass = `flex w-full items-center gap-3 whitespace-nowrap px-3 py-2 text-sm outline-none transition-colors ${
    disabled ? "opacity-50" : "hover:bg-black/5 active:bg-black/10"
  } ${className ?? ""}`;

  if (href) {
    return (
      <a
        role="menuitem"
        tabIndex={-1}
        href={href}
        target={target}
        rel={rel}
        className={commonClass}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
          }
          onSelect?.();
        }}
      >
        {leading}
        <span className="flex-1">{children}</span>
        {trailing}
      </a>
    );
  }

  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      className={commonClass}
      onClick={() => onSelect?.()}
    >
      {leading}
      <span className="flex-1 text-left">{children}</span>
      {trailing}
    </button>
  );
}

export function MenuSeparator() {
  return <div className="my-1 h-px w-full bg-black/10" />;
}

export default Menu;
