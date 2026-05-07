import React from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

import { products as allProducts } from "@/data/products";

export default function ProductSection() {
  const products = allProducts.slice(0, 6);
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
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
