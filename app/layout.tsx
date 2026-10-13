import "./globals.css";
import { Inter, Space_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";

// Inter stands in for Roobert (per design.md substitutes)
const inter = Inter({ subsets: ["latin"], variable: "--font-roobert" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

export const metadata = { title: "ReKickz | thrifted shoes, pakistan", description: "one-of-one pre-loved sneakers, cleaned and inspected. order on whatsapp." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body><CartProvider><Header />{children}</CartProvider></body>
    </html>
  );
}
