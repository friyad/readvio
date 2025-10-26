import Link from "next/link";
import { useState } from "react";
import Menu, { MenuItem, MenuSeparator } from "../ui/menu";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Avatar from "../ui/avatar";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorExtractor";
import { useAuthStore } from "@/stores/auth-store";

const ProfileMenuTrigger = ({ userName }: { userName: string }) => {
  return (
    <button
      type="button"
      className="items-center gap-2 rounded-full p-1 hover:bg-secondary-orange/10 hidden md:inline-flex"
    >
      <Avatar name={userName} />
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block"
      >
        <path
          d="M5 8l5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

type ProfileMenuProps = {};

const ProfileMenu = ({}: ProfileMenuProps) => {
  const clearUser = useAuthStore((state) => state.clearUser);
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const res = await signOut();
      if (res.error) throw new Error(res.error.message);
      clearUser();
      toast.success("Signed out successfully");
      setIsLoading(false);
      router.replace("/");
      setOpen(false);
    } catch (error: unknown) {
      toast.error(extractErrorMessage(error));
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Menu
        trigger={<ProfileMenuTrigger userName={user?.name || "Guest"} />}
        openOnHover
        align="end"
        panelClassName="hidden md:block"
      >
        <MenuItem>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary-orange" />
            <span className="text-primary-blue">Referral points</span>
            <span className="ml-0.5 font-semibold text-primary-blue">
              {user?.creditScore || 0}
            </span>
          </div>
        </MenuItem>
        <MenuSeparator />
        <MenuItem href="/dashboard/profile">
          <span className="text-primary-blue">Profile</span>
        </MenuItem>
        <MenuItem href="/dashboard/referrals">
          <span className="text-primary-blue">Referrals</span>
        </MenuItem>
        <MenuItem href="/dashboard/link">
          <span className="text-primary-blue">Referral Link</span>
        </MenuItem>
        <MenuItem href="/dashboard">
          <span className="text-primary-blue">Dashboard</span>
        </MenuItem>
        <MenuItem href="/dashboard/settings">
          <span className="text-primary-blue">Settings</span>
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          onSelect={handleSignOut}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <span className="text-secondary-orange font-semibold">Sign out</span>
        </MenuItem>
      </Menu>

      {/* For small Devices */}

      <div className="md:hidden">
        <div className="rounded-md border border-accent-blue/20 bg-accent-blue/5">
          <div className="px-3 py-2 text-xs font-bold text-primary-blue/80">
            Account
          </div>
          <div className="border-t border-accent-blue/10 pt-2">
            <Link
              href="/dashboard/profile"
              className="block px-3 py-3 text-sm text-primary-blue hover:bg-secondary-orange/10"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/dashboard/referrals"
              className="block px-3 py-3 text-sm text-primary-blue hover:bg-secondary-orange/10"
              onClick={() => setOpen(false)}
            >
              Referrals
            </Link>
            <Link
              href="/dashboard/link"
              className="block px-3 py-3 text-sm text-primary-blue hover:bg-secondary-orange/10"
              onClick={() => setOpen(false)}
            >
              Referral Link
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-3 text-sm text-primary-blue hover:bg-secondary-orange/10"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/settings"
              className="block px-3 py-3 text-sm text-primary-blue hover:bg-secondary-orange/10"
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>
          </div>
        </div>

        <Button
          variant="orange"
          size="sm"
          disabled={isLoading}
          onClick={handleSignOut}
          className="w-full mt-6"
        >
          Sign out
        </Button>
      </div>
    </>
  );
};

export default ProfileMenu;
