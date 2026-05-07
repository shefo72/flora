import React from "react";
import Image from "next/image";
import about from "../../public/assets/images/aBOUT.webp";

export default function About() {
  return (
    <>
      <section className="bg-stone-100 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xs tracking-widest text-gray-500 uppercase">
              Our Ethos
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 leading-tight">
              Rooted in Mindfulness,
              <br />
              Grown with Intent.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Petals & Bloom was born from a desire to reconnect with the
              seasonal rhythms of the earth. We believe a bouquet is more than a
              gift; it&apos;s a silent messenger of grace and appreciation.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              We work exclusively with local artisans and sustainable farms to
              ensure that every stem in our studio is treated with the respect
              it deserves, from seed to your doorstep.
            </p>
          </div>
          <div className="relative">
            <Image
              src={about}
              alt="Flower shop interior"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
            <div className="absolute top-8 right-8 text-white text-center">
              <p className="font-serif text-2xl tracking-wider">THE</p>
              <p className="font-serif text-2xl tracking-wider">FLORIST</p>
              <p className="font-serif text-2xl tracking-wider">STUDIO</p>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white py-5 px-9 rounded-lg shadow-lg hidden md:block max-w-67">
              <p className="text-gray-600 italic text-md leading-relaxed">
                &quot;Beauty is found in the restraint of nature.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
