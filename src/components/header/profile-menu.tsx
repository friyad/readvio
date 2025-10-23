import Link from "next/link";
import { useState } from "react";
import Menu, { MenuItem, MenuSeparator } from "../ui/menu";

const Avatar = ({ name }: { name?: string }) => {
  const initials = (name ?? "Guest")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-blue/10 text-sm font-medium text-primary-blue">
      {initials}
    </div>
  );
};

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

type ProfileMenuProps = {
  userName: string;
  referralPoints: number;
};

const ProfileMenu = ({ userName, referralPoints }: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Menu
        trigger={<ProfileMenuTrigger userName={userName} />}
        openOnHover
        align="end"
        panelClassName="hidden md:block"
      >
        <div className="px-3 py-2 text-sm font-medium text-primary-blue/80">
          Signed in as {userName ?? "Guest"}
        </div>
        <MenuSeparator />
        <MenuItem href="/profile">
          <span className="text-primary-blue">Profile</span>
        </MenuItem>
        <MenuItem href="/orders">
          <span className="text-primary-blue">Orders</span>
        </MenuItem>
        <MenuItem href="/settings">
          <span className="text-primary-blue">Settings</span>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary-orange" />
            <span className="text-primary-blue">Referral points</span>
            <span className="ml-1 font-semibold text-primary-blue">
              {referralPoints}
            </span>
          </div>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <span className="text-secondary-orange font-semibold">Sign out</span>
        </MenuItem>
      </Menu>

      {/* For small Devices */}

      <div className="rounded-md border border-accent-blue/20 bg-accent-blue/5 md:hidden">
        <div className="px-3 py-2 text-xs font-bold text-primary-blue/80">
          Account
        </div>
        <div className="border-t border-accent-blue/10 pt-2">
          <Link
            href="/profile"
            className="block px-3 py-3 text-sm text-primary-blue hover:bg-secondary-orange/10"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/orders"
            className="block px-3 py-3 text-sm text-primary-blue hover:bg-secondary-orange/10"
            onClick={() => setOpen(false)}
          >
            Orders
          </Link>
          <Link
            href="/settings"
            className="block px-3 py-3 text-sm text-primary-blue hover:bg-secondary-orange/10"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
