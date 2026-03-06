import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PulseRadar AI – Wellness Trend Intelligence for India",
  description:
    "PulseRadar AI surfaces emerging wellness product opportunities in India using live search, social, and market signals."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans text-slate-50`}
      >
        <div className="grain-layer" />
        {children}
      </body>
    </html>
  );
}

