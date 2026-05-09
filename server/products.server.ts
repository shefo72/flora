import { Product, ProductSchema } from "@/schemas/api.schema";
import { z } from "zod";

const API_BASE_URL = "https://floraapi-production-e891.up.railway.app/api";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products.php`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    let data = await res.json();

    // Handle potential array-wrapped-in-object responses safely
    if (data && !Array.isArray(data)) {
      if (Array.isArray(data.data)) {
        data = data.data;
      } else if (Array.isArray(data.products)) {
        data = data.products;
      } else {
        // Fallback: look for the first array in object values
        const firstArrayValue = Object.values(data).find(Array.isArray);
        if (firstArrayValue) {
          data = firstArrayValue;
        } else {
          // If no array is found, assume the object itself contains the products
          data = Object.values(data);
        }
      }
    }

    // Validate the response against the Zod schema
    const parsed = z.array(ProductSchema).safeParse(data);

    if (!parsed.success) {
      console.error("Zod Validation Error:", parsed.error.format());
      throw new Error("Invalid product data received from API");
    }

    return parsed.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
