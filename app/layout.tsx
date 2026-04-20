import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlayMatch - Find Your Game",
  description: "AI-powered sports event discovery and booking platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-black via-zinc-900 to-black text-foreground antialiased relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
