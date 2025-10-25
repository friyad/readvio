import type { Metadata } from "next";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export const metadata: Metadata = {
  title: {
    template: "%s - Dashboard",
    default: "Home - Dashboard",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <Topbar />
      <div className="flex min-h-[calc(100vh-73px)] w-full">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 w-full bg-clean-white/50 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
