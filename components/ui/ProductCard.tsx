import { formatCurrency } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface Product {
  id: number;
  image: string | StaticImageData;
  title: string;
  category: string;
  description: string;
  price: number | string;
  badge?: string | null;
  onAddToCart?: () => void;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { image, title, description, price, badge, onAddToCart } = product;

  return (
    <div className="group flex flex-col items-center text-center bg-transparent w-full h-full">
      <div className="relative overflow-hidden rounded-md mb-5 w-full aspect-4/5 cursor-pointer shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {badge && (
          <span className="absolute top-4 left-4 bg-white/90 text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider z-10 uppercase">
            {badge}
          </span>
        )}
      </div>

      <h3 className="font-serif text-2xl text-gray-900 mb-2 cursor-pointer hover:text-flora-green transition-colors">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mb-4 max-w-[90%] leading-relaxed">
        {description}
      </p>

      <div className="mt-auto w-full flex flex-col items-center">
        <p className="text-flora-green text-lg mb-6">
          {formatCurrency(Number(price))}
        </p>

        <button
          onClick={onAddToCart}
          className="w-full bg-flora-green text-white tracking-[0.15em] text-sm py-3.5 hover:bg-flora-hover transition-colors duration-300 cursor-pointer"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
