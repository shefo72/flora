
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    pathname === path
      ? "text-[#3E6C4D] font-bold"
      : "text-gray-500";

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#F7F7EF] shadow-md">

      {/* Left - Icons */}
      <div className="text-2xl font-bold text-[#3E6C4D]">Flora</div>

      {/* Center - Links */}
      <div className="flex items-center gap-8 text-lg">
        <Link href="/" className={linkStyle("/")}>
          Home
        </Link>
        <Link href="/products" className={linkStyle("/products")}>
          Products
        </Link>
         <Link href="/dashboard" className={linkStyle("/dashboard")}>Dashboard</Link>
       
      </div>

      {/* Right - Title */}
      <div className="flex items-center gap-4">
        <Link href="/cart">
          <ShoppingCart
            className={`w-6 h-6 cursor-pointer ${
              pathname === "/cart" ? "text-[#3E6C4D]" : "text-gray-500"
            }`}
          />
        </Link>

        <User className="w-6 h-6 cursor-pointer text-gray-500" />
      </div>
    </nav>
  );
}