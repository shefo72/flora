export interface Product {
  product_id: number;
  product_name: string;
  description: string | null;
  category_name: string;
  collection: string;
  price: number;
  image_url: string;
}

export const products: Product[] = [
  {
    product_id: 1,
    product_name: "Espresso",
    description: "Strong and rich espresso made from premium roasted beans.",
    category_name: "Romantic",
    collection: "Classic Brews",
    price: 4.5,
    image_url: "/products/1.webp",
  },
  {
    product_id: 2,
    product_name: "Flat White",
    description: "Smooth coffee with velvety steamed milk and rich espresso.",
    category_name: "Romantic",
    collection: "Classic Brews",
    price: 5.5,
    image_url: "/products/2.webp",
  },
  {
    product_id: 3,
    product_name: "Slow-Drip Cold Brew",
    description: "Slow brewed cold coffee for a refreshing smooth taste.",
    category_name: "Seasonal",
    collection: "Summer Refreshers",
    price: 6.0,
    image_url: "/products/3.webp",
  },
  {
    product_id: 4,
    product_name: "Vanilla Latte",
    description: "Creamy latte infused with sweet vanilla flavor.",
    category_name: "Seasonal",
    collection: "Summer Refreshers",
    price: 5.75,
    image_url: "/products/4.webp",
  },
  {
    product_id: 5,
    product_name: "Classic Butter Croissant",
    description: "Flaky buttery croissant baked fresh daily.",
    category_name: "Wildflower",
    collection: "Fresh Pastries",
    price: 4.25,
    image_url: "/products/5.webp",
  },
  {
    product_id: 6,
    product_name: "Almond Croissant",
    description: "Rich croissant filled with almond cream and topping.",
    category_name: "Wildflower",
    collection: "Fresh Pastries",
    price: 5.5,
    image_url: "/products/6.webp",
  },
  {
    product_id: 7,
    product_name: "Pistachio Ganache Tart",
    description: "Luxury tart with smooth pistachio ganache filling.",
    category_name: "Wildflower",
    collection: "Fresh Pastries",
    price: 6.5,
    image_url: "/products/7.webp",
  },
  {
    product_id: 8,
    product_name: "Avocado Sourdough Toast",
    description: "Fresh avocado served on toasted sourdough bread.",
    category_name: "Wedding",
    collection: "Morning Toasts",
    price: 12.0,
    image_url: "/products/8.webp",
  },
  {
    product_id: 9,
    product_name: "Smoked Salmon Toast",
    description: "Premium smoked salmon with creamy spread on toast.",
    category_name: "Wedding",
    collection: "Morning Toasts",
    price: 14.5,
    image_url: "/products/9.webp",
  },
  {
    product_id: 10,
    product_name: "Mushroom & Truffle Toast",
    description: "Gourmet toast with mushrooms and truffle oil.",
    category_name: "Wedding",
    collection: "Morning Toasts",
    price: 13.5,
    image_url: "/products/10.webp",
  },
];
