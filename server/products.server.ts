const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products.php`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
