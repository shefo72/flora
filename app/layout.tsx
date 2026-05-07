import type { Metadata } from "next";
import { notoSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flora Store",
  description: "E-commerce website for flowers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${notoSerif.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
