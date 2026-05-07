import React from "react";
import Hero from "./_Home/hero";
import Collection from "./_Home/collection";
import About from "./_Home/about";
import ProductSection from "./_Home/productSection";
import NewsLetter from "./_Home/newsLetter";

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
