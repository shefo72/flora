"use client";
import Image from "next/image";
import { addToCart } from "@/store/cartSlice";
import { formatCurrency } from "@/lib/utils";
import image from "../../public/assets/images/4.webp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

export default function ProductCard({ product }: { product: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.cart);
  const { product_id, image_url, product_name, description, price } = product;

  function handleAddToCart() {
    dispatch(
      addToCart({
        customer_id: 1,
        product_id: product_id,
        quantity: 1,
      }),
    );
  }

  return (
    <div className="group flex flex-col items-center text-center bg-transparent w-full h-full">
      <div className="relative overflow-hidden rounded-md mb-5 w-full aspect-4/5 cursor-pointer shrink-0">
        <Image
          src={image}
          alt={`${product_name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      <h3 className="font-serif text-2xl text-gray-900 mb-2 cursor-pointer hover:text-flora-green transition-colors">
        {product_name}
      </h3>

      <p className="text-gray-500 text-sm mb-4 max-w-[90%] leading-relaxed line-clamp-2">
        {description}
      </p>

      <div className="mt-auto w-full flex flex-col items-center">
        <p className="text-flora-green text-lg mb-6">
          {formatCurrency(Number(price))}{" "}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full bg-flora-green text-white tracking-[0.15em] text-sm py-3.5 hover:bg-flora-hover transition-colors duration-300 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
