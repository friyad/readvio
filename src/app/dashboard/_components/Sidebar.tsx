"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  User,
  Home,
  Link as LinkIcon,
  X,
  Settings,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import ProfileMenu from "@/components/header/profile-menu";

const items = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/referrals", label: "Referrals", icon: Megaphone },
  { href: "/dashboard/link", label: "Referral Link", icon: LinkIcon },
  { href: "/dashboard/purchased-books", label: "Purchased Books", icon: Book },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface Props {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  userName?: string;
  referralPoints?: number;
}

const Sidebar = ({ setOpen, userName, referralPoints }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full md:w-48 lg:w-56 mxl:w-64 flex-col border-r border-accent-blue/20 bg-clean-white pb-6 overflow-auto">
      {/* Top section */}
      <div className="py-3 md:py-4 lg:py-5 w-full border-b border-accent-blue/20 px-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-primary-blue/80">Dashboard</p>

        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setOpen && setOpen(false)}
          size="sm"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-1.5">
          {items.map((it) => {
            const Icon = it.icon;
            const active = pathname === it.href;
            return (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 md:py-2.5 lg:py-3 text-sm",
                    active
                      ? "bg-primary-orange text-white font-bold"
                      : "text-primary-blue/80 hover:bg-primary-blue/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {userName && referralPoints && (
          <div className="md:hidden">
            <ProfileMenu
              userName={userName || "Guest"}
              referralPoints={referralPoints || 0}
            />
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
