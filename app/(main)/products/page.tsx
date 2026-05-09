import { getProducts } from "@/server/products.server";
import ProductsClient from "./ProductsClient";

export default async function Page() {
  const products = await getProducts();

  return <ProductsClient initialProducts={products} />;
}
