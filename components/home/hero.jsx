import React from "react";
import Image from "next/image";
import hero from "../../public/assets/images/hero.webp";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="relative min-h-screen bg-stone-100 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt="Pink and white peonies bouquet"
            className="w-full h-full object-center object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/90 sm:from-white/50 via-white/70 to-white/30 sm:to-transparent" />
        </div>

        <div className="relative z-10 flex items-center min-h-screen px-6 sm:px-8 md:px-16 lg:px-24 py-20">
          <div className="max-w-xl space-y-5 md:space-y-6">
            <span className="text-xs tracking-widest text-[#6A3930] uppercase font-bold bg-[#E8A59833] px-4 py-2 block w-fit rounded-3xl">
              Artisanal Floral Studio
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight">
              Crafting Nature&apos;s Poetry for Your Most Precious Moments.
            </h1>

            <p className="text-gray-700 md:text-gray-600 text-sm md:text-base leading-relaxed max-w-sm md:max-w-md font-medium md:font-normal">
              Sustainable, hand-picked blooms designed to evoke emotion and
              transform spaces with minimalist elegance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/products"
                className="w-full sm:w-auto cursor-pointer bg-flora-green text-white px-6 py-3.5 sm:py-3 rounded-lg text-sm font-medium hover:bg-flora-hover transition duration-200 text-center shadow-sm"
              >
                Explore Collections
              </Link>
              <Link
                href="/products"
                className="w-full sm:w-auto cursor-pointer border border-flora-green text-flora-green bg-white/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none px-6 py-3.5 sm:py-3 rounded-lg text-sm font-medium hover:border-gray-600 transition text-center"
              >
                Custom Bouquet
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
