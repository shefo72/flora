"use client";

import Image from "next/image";
import { Product } from "../data/products";
import { useCart } from "@/app/context/CartContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col h-full text-center">

      {/* Image */}
      <div className="relative w-full aspect-square mb-3">
        <Image
          src={product.image_url}
          alt={product.product_name}
          fill
          className="object-contain rounded-md"
        />
      </div>

      {/* Name */}
      <h2 className="font-bold text-xl text-[#1C1C16]">
        {product.product_name}
      </h2>

      {/* Description */}
      <p className="text-[#5E5E5B] mt-1 line-clamp-2">
        {product.description}
      </p>

      {/* Price */}
      <div className="mt-2 text-xl text-[#3E6C4D] font-semibold">
        ${product.base_price}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Add to Cart Button */}
      <button
        onClick={() =>
          addToCart({
            product_id: product.product_id,
            product_name: product.product_name,
            base_price: product.base_price,
            image_url: product.image_url,
          })
        }
        className="mt-3 w-full bg-[#3E6C4D] text-white py-2 rounded-md hover:bg-[#21422c] transition"
      >
        Add to Cart
      </button>

    </div>
  );
}