import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import SiteHeader from "@/components/header/site-header";

import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${instrumentSans.variable} antialiased`}
      >
        <SiteHeader />
        <div>{children}</div>
      </body>
    </html>
  );
}
