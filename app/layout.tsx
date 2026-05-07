import type { Metadata } from "next";
import { ToastContainer, Bounce } from "react-toastify";
import { notoSerif } from "@/lib/fonts";

import Header from "../components/ui/Header";
import "./globals.css";

import { CartProvider } from "../context/CartContext";
import Providers from "../components/providers/providers";
import Footer from "./../components/ui/Footer";

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
          <CartProvider>
            <Header />

            <main className="flex-1">{children}</main>

            <Footer />

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
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
