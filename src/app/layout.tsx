import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Classy Car Rentals",
  description: "Premium dark-mode car rental marketplace built with Next.js",
  metadataBase: new URL("https://classycar.local"),
  openGraph: {
    title: "Classy Car Rentals",
    description: "Browse, compare, and book luxury rides across Kenya in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="page-shell min-h-full flex flex-col">
        <div className="noise-overlay" aria-hidden="true" />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
