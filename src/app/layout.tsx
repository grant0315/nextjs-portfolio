import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Space_Grotesk, Sora, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Grant Hopkins | Full-Stack Developer & AI/ML Specialist",
  description: "Portfolio of Grant Hopkins - builder of data-driven software, AI systems, and real estate tech solutions. Explore my projects in Python, React, Next.js, and more.",
  keywords: ['software engineer', 'AI/ML', 'real estate tech', 'full-stack developer', 'data scientist', 'product builder'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} ${sora.variable} ${playfairDisplay.variable} antialiased`}
        style={{
          background: 'linear-gradient(135deg, #faf8f6 0%, #f3ede8 50%, #ede3dd 100%)',
          minHeight: '100vh'
        }}
      >
        {children}
      </body>
    </html>
  );
}
