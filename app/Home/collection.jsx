import React from "react";
import Image from "next/image";
import image1 from '../../public/assets/images/1.jpg';
import image2 from '../../public/assets/images/2.jpg';
import image3 from '../../public/assets/images/3.jpg';
import image4 from '../../public/assets/images/4.jpg';
export default function Collection() {
    return <>
        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Curated Collections</h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
            Explore our thoughtfully selected arrangements, each designed to bring joy and elegance to any occasion.
          </p>
        </div>

        <div className="grid md:grid-cols-4 grid-rows-2 gap-6">
          <div className="col-span-2 row-span-2 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <Image 
                src={image1} 
                alt="Pink bouquet" 
                className="w-full h-170 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-serif text-xl mb-1">The Eternal Spring</h3>
                <p className="text-sm opacity-90">Ephemeral beauty, captured.</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 row-span-1 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <Image 
                src={image2} 
                alt="Purple flowers" 
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-serif text-xl mb-1">Quiet Elegance</h3>
                <p className="text-sm opacity-90">Focused, sculptural arrangements.</p>
              </div>
            </div>
          </div>

          <div className="col-span-1 row-span-1 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <Image 
                src={image3} 
                alt="White and yellow flowers" 
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-90 uppercase">bespoke events</p>
              </div>
            </div>
        </div>
         <div className="col-span-1 row-span-1 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <Image 
                src={image4} 
                alt="White and yellow flowers" 
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-90 uppercase">bespoke events</p>
              </div>
            </div>
          </div>
        </div>
    </section>
    </>
}
