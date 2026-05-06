import React from "react";
import Hero from '../app/Home/hero';
import Collection from '../app/Home/collection';
import About from '../app/Home/about';
import ProductSection from '../app/Home/productSection';
import NewsLetter from '../app/Home/newsLetter';

export default function Page() {
  return <>
    <Hero />
    <Collection />  
    <About />
    <ProductSection />
    <NewsLetter />
  </>
}
