"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import navLogo from "../../public/navLogo.avif";
import { rasa } from "@/lib/fonts";
import { Flower, ShoppingBag, Store, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { logout } from "@/store/authSlice";

const navItems = [
  { name: "Orders", path: "/dashboard/orders", icon: ShoppingBag },
  { name: "Products", path: "/dashboard/products", icon: Flower },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-16 sm:w-64 bg-[#FAFAF9] min-h-screen fixed left-0 top-0 flex flex-col border-r border-gray-200 z-50 transition-all duration-300">
      <div className="hidden sm:flex flex-col items-start px-8 pt-10 pb-8">
        <div className="flex items-center gap-2">
          <Image
            src={navLogo}
            alt="Flora Logo"
            className="w-14 object-contain"
          />
          <h1
            className={`${rasa.className} text-4xl italic font-medium text-flora-green tracking-wide mt-1`}
          >
            Flora
          </h1>
        </div>
        <p className="text-gray-500 text-sm mt-1 ml-5">Admin Dashboard</p>
      </div>

      <div className="flex sm:hidden justify-center pt-6 pb-4 border-b border-gray-100">
        <Image src={navLogo} alt="Flora Icon" className="w-8 object-contain" />
      </div>

      <nav className="flex flex-col mt-4 sm:mt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.path}
              title={item.name}
              className={`flex items-center justify-center sm:justify-start gap-3 sm:pl-8 py-4 sm:py-3.5 text-[15px] transition-colors ${
                isActive
                  ? "bg-[#F0F8F4] text-[#065F46] border-r-4 border-[#065F46] font-medium"
                  : "text-gray-500 border-r-4 border-transparent hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <Icon
                strokeWidth={isActive ? 2 : 1.5}
                className={`w-6 h-6 sm:w-5 sm:h-5 shrink-0 ${
                  isActive ? "text-[#065F46]" : "text-gray-500"
                }`}
              />
              <span className="hidden sm:block">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col pb-6">
        <Link
          href="/"
          title="Back to Store"
          className="flex items-center justify-center sm:justify-start gap-3 sm:pl-8 py-4 sm:py-3.5 text-[15px] text-gray-500 hover:bg-gray-100 hover:text-flora-green transition-colors"
        >
          <Store strokeWidth={1.5} className="w-6 h-6 sm:w-5 sm:h-5 shrink-0" />
          <span className="hidden sm:block">Back to Store</span>
        </Link>

        <div className="w-8 sm:w-48 h-1px bg-gray-200 mx-auto my-1"></div>

        <button
          onClick={handleLogout}
          title="Logout"
          className="flex w-full items-center justify-center sm:justify-start gap-3 sm:pl-8 py-4 sm:py-3.5 text-[15px] text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer border-r-4 border-transparent"
        >
          <LogOut
            strokeWidth={1.5}
            className="w-6 h-6 sm:w-5 sm:h-5 shrink-0"
          />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}
