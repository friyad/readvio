"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Drawer from "@/components/ui/drawer";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { Brand } from "@/components/header/site-header";
import ProfileMenu from "@/components/header/profile-menu";

const Topbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-accent-blue/20 bg-clean-white px-4 sm:px-6 lg:px-8">
        <Brand />

        <div className="hidden md:block">
          <ProfileMenu />
        </div>

        <Button
          variant="ghost"
          className="md:hidden"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        side="left"
        panelClassName="md:hidden w-72"
      >
        <Sidebar setOpen={setOpen} />
      </Drawer>
    </>
  );
};

export default Topbar;
