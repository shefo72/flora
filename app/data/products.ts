export type ProductStatus = "in stock" | "low stock" | "out of stock";

export type Product = {
  product_id: number;
  product_name: string;
  category_name: string;
  base_price: number;
  image_url: string;
  rating: number;
  badge: string | null;
  status: ProductStatus;
  description: string;
};

export const products: Product[] = [
  {
    product_id: 1,
    product_name: "Espresso",
    category_name: "Romantic",
    base_price: 4.5,
    image_url: "/products/1.png",
    rating: 4.8,
    badge: "Bestseller",
    status: "in stock",
    description: "Strong and rich espresso made from premium roasted beans.",
  },
  {
    product_id: 2,
    product_name: "Flat White",
    category_name: "Romantic",
    base_price: 5.5,
    image_url: "/products/2.png",
    rating: 4.9,
    badge: null,
    status: "in stock",
    description: "Smooth coffee with velvety steamed milk and rich espresso.",
  },
  { 
    product_id: 3,
    product_name: "Slow-Drip Cold Brew",
    category_name: "Seasonal",
    base_price: 6.0,
    image_url: "/products/3.png",
    rating: 4.7,
    badge: "Bestseller",
    status: "low stock",
    description: "Slow brewed cold coffee for a refreshing smooth taste.",
  },
  {
    product_id: 4,
    product_name: "Vanilla Latte",
    category_name: "Seasonal ",
    base_price: 5.75,
    image_url: "/products/4.png",
    rating: 4.6,
    badge: "New",
    status: "in stock",
    description: "Creamy latte infused with sweet vanilla flavor.",
  },
  {
    product_id: 5,
    product_name: "Classic Butter Croissant",
    category_name: "Wildflower",
    base_price: 4.25,
    image_url: "/products/5.png",
    rating: 4.8,
    badge: "Bestseller",
    status: "in stock",
    description: "Flaky buttery croissant baked fresh daily.",
  },
  {
    product_id: 6,
    product_name: "Almond Croissant",
    category_name: "Wildflower",
    base_price: 5.5,
    image_url: "/products/6.png",
    rating: 4.9,
    badge: null,
    status: "low stock",
    description: "Rich croissant filled with almond cream and topping.",
  },
  {
    product_id: 7,
    product_name: "Pistachio Ganache Tart",
    category_name: "Wildflower",
    base_price: 6.5,
    image_url: "/products/7.png",
    rating: 4.7,
    badge: "Limited",
    status: "out of stock",
    description: "Luxury tart with smooth pistachio ganache filling.",
  },
  {
    product_id: 8,
    product_name: "Avocado Sourdough Toast",
    category_name: "Wedding",
    base_price: 12.0,
    image_url: "/products/8.png",
    rating: 4.5,
    badge: null,
    status: "in stock",
    description: "Fresh avocado served on toasted sourdough bread.",
  },
  {
    product_id: 9,
    product_name: "Smoked Salmon Toast",
    category_name: "Wedding",
    base_price: 14.5,
    image_url: "/products/9.png",
    rating: 4.9,
    badge: "Bestseller",
    status: "in stock",
    description: "Premium smoked salmon with creamy spread on toast.",
  },
  {
    product_id: 10,
    product_name: "Mushroom & Truffle Toast",
    category_name: "Wedding",
    base_price: 13.5,
    image_url: "/products/10.png",
    rating: 4.8,
    badge: "New",
    status: "low stock",
    description: "Gourmet toast with mushrooms and truffle oil.",
  },
];