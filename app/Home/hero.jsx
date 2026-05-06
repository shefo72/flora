import React from 'react'
import Image from 'next/image'
import hero from '../../public/assets/images/hero.jpg'

export default function Hero() {
    return <>
      <section className="relative min-h-screen bg-stone-100 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={hero} 
            alt="Pink and white peonies bouquet" 
            className="w-full h-full object-center object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/20 via-white/70 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center min-h-screen px-8 md:px-16 lg:px-24">
          <div className="max-w-xl space-y-6">
            <span className="text-xs tracking-widest text-red-800 uppercase font-medium bg-[#E8A59833] p-1 rounded-3xl">
              Artisanal Floral Studio
            </span>
            
            <h1 className="min-w-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight">
              Crafting Nature's Poetry<br />
              for Your Most Precious<br />
              Moments.
            </h1>
            
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md">
              Sustainable, hand-picked blooms designed to evoke emotion and transform spaces with minimalist elegance.
            </p>
            
            <div className="flex gap-4 pt-2">
              <button className="bg-green-800/80 text-white px-6 py-3 rounded-lg text-sm hover:bg-green-800 transition">
                Explore Collections
              </button>
              <button className="border border-gray-400 text-gray-700 px-6 py-3 rounded-lg text-sm hover:border-gray-600 transition">
                Custom Bouquet
              </button>
            </div>
          </div>
        </div>
    </section>
    </>
}
