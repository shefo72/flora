import type { Metadata } from "next";
import { notoSerif } from "@/lib/fonts";
import "./globals.css";
import Providers from "@/components/providers/providers";
import { ToastContainer, Bounce } from "react-toastify";

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
        <Providers>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </Providers>
      </body>
    </html>
  );
}
