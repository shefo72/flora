const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products.php`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`,
      );
    }

    const jsonResponse = await res.json();

    return jsonResponse.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
