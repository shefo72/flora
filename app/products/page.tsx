"use client";
import React from "react";
import { useState } from "react";
import { products } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";
import { Button } from "@/components/ui/button";

const categories = [
  "Romantic",
  "Seasonal",
  "Wildflower",
  "Wedding",
];

export default function page() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("Romantic");

 const filteredProducts = products.filter((p) => {
  const matchCategory = p.category_name === selectedCategory;

  const matchSearch = p.product_name
    .toLowerCase()
    .includes(search.toLowerCase());

  return matchCategory && matchSearch;
});
  return(
   <div className="bg-[#FAFAF9] min-h-screen ">
   <div className="p-8 text-center">
   <h1 className="text-[#000000D9] font-bold  text-4xl">Our Flowers</h1>
   <p className="text-[#5E5E5B] p-2">Creating moments that stay in the heart forever. Aesthetic in every petal.</p>
   <input
        type="text"
        placeholder="Search flowers..."
        className="w-full md:w-1/3 p-2 border rounded-xl m-6 bg-[#4C624757]"
        onChange={(e) => setSearch(e.target.value)}
      />
   </div>
<div className="flex justify-center mb-6">
  <div className="flex gap-4">
   {categories.map((cat) => (
     <Button
  key={cat}
  size="lg"
  variant={selectedCategory === cat ? "default" : "outline"}
  onClick={() => setSelectedCategory(cat)}
  className={`text-base px-6 py-5 rounded-full transition text-[#5E5E5B]
    ${
      selectedCategory === cat
        ? "bg-[#3E6C4D] text-white hover:bg-[#22422d]"
        : ""
    }
  `}
>
  {cat}
</Button>
    ))}
  </div>
</div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
          />
        ))}
      </div>

    </div>

  );
}
