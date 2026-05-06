import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#4C6247] mt-1 px-8 py-10">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 1- Logo + Description */}
        <div>
          <h2 className="text-xl mb-3 text-[#FFFFFF]">Petal & Bloom</h2>
          <p className="text-[#E7E5E4CC] text-sm">
            Curating moments of botanical beauty with sustainability at our heart.
          </p>
        </div>

        {/* 2- Links */}
        <div>
          <h3 className="text-xl mb-3 text-[#F5F5F4]">SHOP</h3>
          <ul className="space-y-2 text-[#E7E5E4CC] text-sm">
            <li className="hover:text-black cursor-pointer"><Link href="/">
            Home</Link>
            </li>
            <li className="hover:text-black cursor-pointer"><Link href="/products"> Products </Link>
            </li>
             
            <li className="hover:text-black cursor-pointer"> <Link href="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        {/* 3- Help */}
        <div>
          <h3 className="text-xl mb-3 text-[#F5F5F4]">ABOUT</h3>
          <div className="space-y-2 text-[#E7E5E4CC] text-sm">
             <p >We create stunning floral arrangements that turn your moments into memories. Fresh flowers, elegant designs, and same-day delivery for all your special occasions.</p>
          </div>
        </div>

        {/* 4- Contact / Social */}
        <div>
          <h3 className="text-xl text-[#F5F5F4] mb-3">LEGAL</h3>
           <ul className="space-y-2 text-[#E7E5E4CC] text-sm">
            <li className=""> PRIVACY </li>
            <li className=""> TERMS </li>
            <li className="">SHIPPING</li>
            <li className="">CONTACT</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className=" text-[#E7E5E4CC] text-sm mt-8  pt-4">
        © 2026 MyStore. All rights reserved.
      </div>

    </footer>
  );
}

