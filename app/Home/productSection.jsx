import React from 'react'
import Image from 'next/image'
import card1 from '../../public/assets/images/card1.jpg'
import card2 from '../../public/assets/images/card2.jpg'
import card3 from '../../public/assets/images/card3.jpg'
import Link from 'next/link'

export default function ProductSection() {
    return <>
        <section className="bg-stone-50 px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">New Arrivals</h2>
            <p className="text-gray-500 text-sm">The latest blooms just arrived in our studio.</p>
          </div>
          <Link href="/products" className="text-gray-600 text-sm hover:text-gray-900 transition underline underline-offset-4">
            Shop All New Arrivals
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <Image 
                src={card1} 
                alt="The Blushing Aura" 
                className="w-full h-100 object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full tracking-wide">
                NEW ARRIVAL
              </span>
            </div>
            <h3 className="font-serif text-xl text-gray-900 mb-1">The Blushing Aura</h3>
            <p className="text-gray-500 text-sm mb-2">Ranunculus & Dusty Miller</p>
            <p className="text-gray-900 font-medium">$85.00</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <Image 
                src={card2} 
                alt="Wild Woodland" 
                className="w-full h-100 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <h3 className="font-serif text-xl text-gray-900 mb-1">Wild Woodland</h3>
            <p className="text-gray-500 text-sm mb-2">Eucalyptus & White Lisianthus</p>
            <p className="text-gray-900 font-medium">$72.00</p>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <Image 
                src={card3} 
                alt="Sunset Glow" 
                className="w-full h-100 object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full tracking-wide">
                SEASONAL
              </span>
            </div>
            <h3 className="font-serif text-xl text-gray-900 mb-1">Sunset Glow</h3>
            <p className="text-gray-500 text-sm mb-2">Dahlias & Golden Solidago</p>
            <p className="text-gray-900 font-medium">$94.00</p>
          </div>
        </div>
      </div>
    </section>
    </>
}
