"use server";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function processCheckout(payload: any) {
  try {
    const response = await axios.post(`${API_URL}/checkout.php`, payload);

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Checkout Error:", error.response?.data || error.message);
    return {
      success: false,
      message:
        error.response?.data?.error || "Failed to process order on server.",
    };
  }
}
