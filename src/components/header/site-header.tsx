"use client";

import Link from "next/link";
import { useState } from "react";
import Drawer from "@/components/ui/drawer";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { MenuIcon, XIcon } from "lucide-react";
import ProfileMenu from "./profile-menu";
import useScrollPinned from "@/hooks/scroll-pinned";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type SiteHeaderProps = {
  referralPoints?: number;
  userName?: string;
};

const navItems: { label: string; href: string }[] = [
  { label: "Browse", href: "/browse" },
  { label: "Library", href: "/library" },
  { label: "Store", href: "/store" },
  { label: "Pricing", href: "/pricing" },
];

function Brand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-base font-semibold text-primary-blue"
    >
      <Image
        src={Logo}
        alt="Readvio"
        width={300}
        height={150}
        className="w-auto h-6"
      />
    </Link>
  );
}

function Hamburger({ open }: { open: boolean }) {
  if (open) return <XIcon className="text-background" />;
  return <MenuIcon className="text-background" />;
}

export default function SiteHeader({
  referralPoints = 0,
  userName,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scroll, pinned } = useScrollPinned();

  const items = navItems.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        "text-sm font-medium transition-colors",
        pathname === item.href
          ? "text-primary-blue font-bold"
          : "text-primary-blue/80 hover:text-primary-blue"
      )}
    >
      {item.label}
    </Link>
  ));

  return (
    <>
      <header
        className={cn(
          "border-b border-secondary-orange bg-clean-white relative z-30",
          scroll.y <= 765
            ? "relative translate-y-0"
            : !pinned
            ? "-translate-y-full"
            : "sticky top-0 translate-y-0 transition-all duration-500 shadow-md"
        )}
      >
        <div className="h-1 md:h-2 w-full bg-linear-to-l from-primary-orange to-secondary-orange" />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Brand />

          <nav className="hidden items-center gap-6 md:flex">{items}</nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-accent-blue/20 px-3 py-1 text-xs font-medium md:flex bg-accent-blue/5">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary-orange" />
              <span className="text-primary-blue">Referral</span>
              <span className="font-semibold text-primary-blue">
                {referralPoints} pts
              </span>
            </div>

            <div className="hidden md:block">
              <ProfileMenu
                userName={userName || "Guest"}
                referralPoints={referralPoints || 0}
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="-ml-1 inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary-orange/10 md:hidden"
            onClick={() => setOpen(true)}
          >
            <Hamburger open={false} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        side="left"
        panelClassName="md:hidden"
      >
        <div className="flex h-full flex-col bg-clean-white">
          <div className="flex h-16 items-center justify-between border-b border-secondary-orange px-4">
            <Brand />
            <button
              type="button"
              aria-label="Close menu"
              className="rounded-md p-2 hover:bg-secondary-orange/10"
              onClick={() => setOpen(false)}
            >
              <Hamburger open={true} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="mb-3 flex items-center gap-2 rounded-full border border-accent-blue/20 px-3 py-1 text-xs font-medium bg-accent-blue/5">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary-orange" />
              <span className="text-primary-blue">Referral</span>
              <span className="font-semibold text-primary-blue ml-auto">
                {referralPoints} pts
              </span>
            </div>

            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-2 text-base font-medium text-primary-blue/90 hover:bg-secondary-orange/10"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <ProfileMenu
              userName={userName || "Guest"}
              referralPoints={referralPoints || 0}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
