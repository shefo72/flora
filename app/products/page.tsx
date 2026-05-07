"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

const categories = ["ALL FLOWERS", "Wildflower", "Wedding", "SEASONAL"];

export default function Page() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL FLOWERS");

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "ALL FLOWERS" ||
      p.category?.toUpperCase() === selectedCategory;

    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-[#FCFBF8] min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-gray-900 font-serif font-bold text-4xl md:text-5xl mb-4 tracking-wide">
            Our Flowers
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Creating moments that stay in the heart forever. Aesthetic in every
            petal.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-8 border-b border-transparent">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs md:text-sm tracking-widest uppercase pb-2 transition-all duration-300 border-b-2 cursor-pointer ${
                selectedCategory === cat
                  ? "border-flora-green text-gray-800 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#C9D1C8]/60 text-gray-800 placeholder-gray-500 py-3 pl-10 pr-4 rounded-md focus:outline-none focus:ring-1 focus:ring-flora-green text-sm transition-shadow"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No flowers found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
