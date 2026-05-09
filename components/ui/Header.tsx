"use client";

import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/store/cartSlice";
import { AppDispatch } from "@/store/store";

import navLogo from "../../public/navLogo.avif";
import { rasa } from "@/lib/fonts";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  // fetch cart
  useEffect(() => {
    dispatch(fetchCart(1));
  }, [dispatch]);

  return (
    <nav className="relative flex items-center justify-between px-4 md:px-8 py-2 bg-[#F7F7EF]">
      <Link
        href="/"
        className="text-flora-green z-10 shrink-0 flex items-center gap-1 "
      >
        <Image src={navLogo} alt="Flora Logo" className="w-16 object-contain" />
        <h1
          className={`${rasa.className} text-4xl italic font-medium tracking-wide mt-1`}
        >
          Flora
        </h1>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-lg">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`transition-colors ${
              pathname === link.path
                ? "text-flora-green font-bold"
                : "text-gray-500 hover:text-flora-green"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-5 md:gap-4 z-10">
        <Link href="/cart">
          <ShoppingCart
            className={`w-6 h-6 cursor-pointer transition-colors ${
              pathname === "/cart"
                ? "text-floragreen"
                : "text-gray-500 hover:text-floragreen"
            }`}
          />
        </Link>

        <div className="hidden md:block">
          <User className="w-6 h-6 cursor-pointer text-gray-500 hover:text-floragreen transition-colors" />
        </div>

        <button
          className="md:hidden cursor-pointer text-floragreen"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={26} strokeWidth={2.5} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#F7F7EF] z-50 transform transition-transform duration-300 ease-out md:hidden shadow-2xl flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Image
                src={navLogo}
                alt="Flora Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-2xl font-bold text-floragreen">Flora</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-floragreen cursor-pointer hover:bg-gray-200/50 p-1 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-8 p-4 bg-white/40 rounded-2xl border border-gray-200/50">
            <div className="w-10 h-10 bg-floragreen rounded-full flex items-center justify-center text-white">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-floragreen">Account</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                Welcome
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? "text-floragreen font-bold"
                      : "text-gray-500 hover:text-floragreen"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-floragreen"></span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
