import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoHire - Premium Car Rental Marketplace",
  description: "AutoHire - Premium dark-mode car rental marketplace with quality vehicles",
  metadataBase: new URL("https://classycar.local"),
  openGraph: {
    title: "AutoHire",
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
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-[#0d0f18] text-white min-h-screen`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
