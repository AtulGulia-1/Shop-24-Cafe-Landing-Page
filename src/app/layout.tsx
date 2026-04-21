import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop24seven Cafe Bahadurgarh",
  description: "Bahadurgarh's finest anytime cafe. Explosive flavor crafted for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-dark text-white selection:bg-brand-lime selection:text-black">
        {children}
      </body>
    </html>
  );
}
