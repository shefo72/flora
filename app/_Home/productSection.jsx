import React from "react";
import card1 from "../../public/assets/images/card1.webp";
import card2 from "../../public/assets/images/card2.webp";
import card3 from "../../public/assets/images/card3.jpg";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

const products = [
  {
    id: 1,
    image: card1,
    title: "The Blushing Aura",
    subtitle: "Ranunculus & Dusty Miller",
    description:
      "A soft romantic bouquet designed with delicate ranunculus and natural dusty miller for an elegant fresh feel.",
    price: 85.0,
    badge: "NEW ARRIVAL",
  },
  {
    id: 2,
    image: card2,
    title: "Wild Woodland",
    subtitle: "Eucalyptus & White Lisianthus",
    description:
      "A wild-inspired arrangement combining fresh eucalyptus with soft white lisianthus for a natural look.",
    price: 72.0,
    badge: null,
  },
  {
    id: 3,
    image: card3,
    title: "Sunset Glow",
    subtitle: "Dahlias & Golden Solidago",
    description:
      "A warm seasonal bouquet featuring vibrant dahlias mixed with golden solidago tones.",
    price: 94.0,
    badge: "SEASONAL",
  },
  {
    id: 4,
    image: card1,
    title: "The Blushing Aura",
    subtitle: "Ranunculus & Dusty Miller",
    description:
      "A soft romantic bouquet designed with delicate ranunculus and natural dusty miller for an elegant fresh feel.",
    price: 85.0,
    badge: "NEW ARRIVAL",
  },
  {
    id: 5,
    image: card2,
    title: "Wild Woodland",
    subtitle: "Eucalyptus & White Lisianthus",
    description:
      "A wild-inspired arrangement combining fresh eucalyptus with soft white lisianthus for a natural look.",
    price: 72.0,
    badge: null,
  },
  {
    id: 6,
    image: card3,
    title: "Sunset Glow",
    subtitle: "Dahlias & Golden Solidago",
    description:
      "A warm seasonal bouquet featuring vibrant dahlias mixed with golden solidago tones.",
    price: 94.0,
    badge: "SEASONAL",
  },
];
export default function ProductSection() {
  return (
    <>
      <section className="bg-stone-50 px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">
                New Arrivals
              </h2>
              <p className="text-gray-500 text-sm">
                The latest blooms just arrived in our studio.
              </p>
            </div>
            <Link
              href="/products"
              className="text-gray-600 text-sm hover:text-gray-900 transition underline underline-offset-4"
            >
              Shop All New Arrivals
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-y-20 gap-x-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
