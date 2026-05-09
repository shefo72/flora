import { z } from "zod";

// --- Products Schema ---
export const ProductSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  price: z.union([z.string(), z.number()]),
  description: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// --- Cart Item Schema ---
export const CartItemSchema = z.object({
  cart_id: z.union([z.string(), z.number()]).optional(),
  customer_id: z.union([z.string(), z.number()]).optional(),
  product_id: z.union([z.string(), z.number()]),
  quantity: z.union([z.number(), z.string()]).transform(val => 
    typeof val === 'string' ? parseInt(val, 10) : val
  ),
  name: z.string().optional(),
  price: z.union([z.string(), z.number()]).optional(),
  image: z.string().optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

// --- Checkout Form Schema ---
export const CheckoutFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zipCode: z.string().min(3, "Zip code is required"),
  notes: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>;
