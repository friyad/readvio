"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type DrawerSide = "left" | "right" | "top" | "bottom";

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: DrawerSide;
  width?: number | string;
  height?: number | string;
  overlayClassName?: string;
  panelClassName?: string;
};

const sideToMotion: Record<DrawerSide, any> = {
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    style: {
      left: 0,
      top: 0,
      bottom: 0,
      width: "80%",
      maxWidth: 360,
      height: "100dvh",
    },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    style: {
      right: 0,
      top: 0,
      bottom: 0,
      width: "80%",
      maxWidth: 360,
      height: "100dvh",
    },
  },
  top: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
    style: { left: 0, right: 0, top: 0, height: "50vh" },
  },
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    style: { left: 0, right: 0, bottom: 0, height: "50vh" },
  },
};

export function Drawer({
  isOpen,
  onClose,
  children,
  side = "left",
  width,
  height,
  overlayClassName,
  panelClassName,
}: DrawerProps) {
  const base = sideToMotion[side];
  const sizeStyle =
    side === "left" || side === "right"
      ? { width: width ?? base.style.width, maxWidth: base.style.maxWidth }
      : { height: height ?? base.style.height };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={`fixed z-40 inset-0 bg-black/40 h-screen w-screen ${
              overlayClassName ?? ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className={`fixed z-50 bg-background shadow-xl ${
              panelClassName ?? ""
            }`}
            initial={base.initial}
            animate={base.animate}
            exit={base.exit}
            transition={{ type: "tween", duration: 0.2 }}
            style={{ ...base.style, ...sizeStyle, zIndex: 60 }}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default Drawer;
