"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    pathname === path
      ? "bg-[#065F46] text-white"
      : "text-gray-600 hover:bg-gray-100";

  return (
    <div className="w-64 h-screen bg-white border-r p-4">
      {/* <h2 className="text-xl font-bold mb-6">Dashboard</h2> */}

      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard/orders"
          className={`p-2 rounded ${linkStyle("/dashboard/orders")}`}
        >
          Orders
        </Link>

        <Link
          href="/dashboard/products"
          className={`p-2 rounded ${linkStyle("/dashboard/products")}`}
        >
          Products
        </Link>
      </div>
    </div>
  );
}
