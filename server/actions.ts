"use server";

import { revalidatePath } from "next/cache";

export async function clearProductsCache() {
  revalidatePath("/products");
  revalidatePath("/");
}
