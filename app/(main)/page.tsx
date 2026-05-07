import React from "react";
import Hero from "@/components/home/hero";
import Collection from "@/components/home/collection";
import About from "@/components/home/about";
import ProductSection from "@/components/home/productSection";
import NewsLetter from "@/components/home/newsLetter";

export default function Page() {
  return (
    <>
      <Hero />
      <Collection />
      <About />
      <ProductSection />
      <NewsLetter />
    </>
  );
}
