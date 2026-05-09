import Link from "next/link";
import { Flower2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCFBF8] flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-flora-green">
        <Flower2 size={80} strokeWidth={1} />
      </div>

      <h1 className="font-serif text-6xl md:text-8xl text-gray-900 mb-4">
        404
      </h1>

      <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-4 tracking-wide uppercase">
        Oops! This flower hasn&#39;t bloomed yet.
      </h2>

      <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="bg-[#2d5a3d] text-white px-8 py-3.5 rounded-full hover:bg-[#1e3d29] transition-all duration-300 shadow-lg hover:shadow-xl uppercase text-sm tracking-widest font-medium"
      >
        Back to Home
      </Link>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-24 fill-[#2d5a3d]"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.15,116.14,111.45,174.45,103.74,232.76,96.03,289.47,78.36,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
}
