import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import SiteHeader from "@/components/header/site-header";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Readvio",
    default: "Home | Readvio",
  },
  description:
    "Readvio is a modern digital library and e-book store where reading meets rewards.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const plainSession = session ? JSON.parse(JSON.stringify(session)) : null;

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${instrumentSans.variable} antialiased`}
      >
        <NextTopLoader
          color="#e87a30"
          height={5}
          zIndex={1600}
          showSpinner={false}
          shadow={false}
        />
        <div className="[&>section]:p-0">
          <Toaster richColors closeButton position="top-center" />
        </div>
        <SiteHeader user={plainSession?.user} />
        <div className="overflow-x-clip">{children}</div>
      </body>
    </html>
  );
}
