const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchDashboardOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard_api.php`);
    const data = await response.json();
    if (data.success) {
      return data.data.recent_orders;
    }
    return [];
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    return [];
  }
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dashboard_api.php?order_id=${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false };
  }
};

export const fetchDashboardProducts = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productsDashboard_api.php/products`,
    );
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return [];
  }
};

export const addProduct = async (productData: any) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productsDashboard_api.php/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Add Product Error:", error);
    return { success: false };
  }
};

export const editProduct = async (productId: number, productData: any) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productsDashboard_api.php/edit?id=${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Edit Product Error:", error);
    return { success: false, message: "Network or Server Error" };
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productsDashboard_api.php/delete?id=${productId}`,
      {
        method: "DELETE",
      },
    );
    return await response.json();
  } catch (error) {
    return { success: false };
  }
};
