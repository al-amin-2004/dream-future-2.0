import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Dream Future", template: "%s - Dream Future" },
  description: "A helpful organization by dream team",
  classification: "Teamwork",
  authors: [
    { name: "Arvin Tushar", url: "https://arvin-tushar.vercel.app/" },
    { name: "Al amin, alaminmridha2004@gmail.com" },
  ],
  keywords: [
    "dream team",
    "dream future",
    "dream donation",
    "dream organization",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
