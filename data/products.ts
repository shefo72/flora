export interface Product {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  price: number;
  badge: string | null;
}

export const products: Product[] = [
  {
    id: 1,
    image: "/products/1.webp",
    title: "Espresso",
    subtitle: "Premium Roasted Beans",
    category: "Romantic",
    description: "Strong and rich espresso made from premium roasted beans.",
    price: 4.5,
    badge: "BESTSELLER",
  },
  {
    id: 2,
    image: "/products/2.webp",
    title: "Flat White",
    subtitle: "Smooth & Velvety",
    category: "Romantic",
    description: "Smooth coffee with velvety steamed milk and rich espresso.",
    price: 5.5,
    badge: null,
  },
  {
    id: 3,
    image: "/products/3.webp",
    title: "Slow-Drip Cold Brew",
    subtitle: "Refreshing Smooth Taste",
    category: "Seasonal",
    description: "Slow brewed cold coffee for a refreshing smooth taste.",
    price: 6.0,
    badge: "BESTSELLER",
  },
  {
    id: 4,
    image: "/products/4.webp",
    title: "Vanilla Latte",
    subtitle: "Sweet Vanilla Infusion",
    category: "Seasonal",
    description: "Creamy latte infused with sweet vanilla flavor.",
    price: 5.75,
    badge: "NEW",
  },
  {
    id: 5,
    image: "/products/5.webp",
    title: "Classic Butter Croissant",
    subtitle: "Freshly Baked Daily",
    category: "Wildflower",
    description: "Flaky buttery croissant baked fresh daily.",
    price: 4.25,
    badge: "BESTSELLER",
  },
  {
    id: 6,
    image: "/products/6.webp",
    title: "Almond Croissant",
    subtitle: "Rich Almond Cream",
    category: "Wildflower",
    description: "Rich croissant filled with almond cream and topping.",
    price: 5.5,
    badge: null,
  },
  {
    id: 7,
    image: "/products/7.webp",
    title: "Pistachio Ganache Tart",
    subtitle: "Luxury Smooth Ganache",
    category: "Wildflower",
    description: "Luxury tart with smooth pistachio ganache filling.",
    price: 6.5,
    badge: "LIMITED",
  },
  {
    id: 8,
    image: "/products/8.webp",
    title: "Avocado Sourdough Toast",
    subtitle: "Fresh Avocado Spread",
    category: "Wedding",
    description: "Fresh avocado served on toasted sourdough bread.",
    price: 12.0,
    badge: null,
  },
  {
    id: 9,
    image: "/products/9.webp",
    title: "Smoked Salmon Toast",
    subtitle: "Premium Smoked Salmon",
    category: "Wedding",
    description: "Premium smoked salmon with creamy spread on toast.",
    price: 14.5,
    badge: "BESTSELLER",
  },
  {
    id: 10,
    image: "/products/10.webp",
    title: "Mushroom & Truffle Toast",
    subtitle: "Gourmet Truffle Oil",
    category: "Wedding",
    description: "Gourmet toast with mushrooms and truffle oil.",
    price: 13.5,
    badge: "NEW",
  },
];
