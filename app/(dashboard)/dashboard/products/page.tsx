"use client";

import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

import DeleteModal from "@/components/DeleteModal";
import EditProductModal from "@/components/EditProductModal";
import AddProductModal from "@/components/AddProductModal";
import {
  fetchDashboardProducts,
  deleteProduct,
} from "@/server/dashboard.server";
import { toast } from "react-toastify";
import { formatCurrency } from "@/lib/utils";
import { clearProductsCache } from "@/server/actions";

export default function ProductsPage() {
  const [productList, setProductList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [addOpen, setAddOpen] = useState(false);

  const refreshProducts = async () => {
    try {
      const data = await fetchDashboardProducts();
      setProductList(data);
    } catch (error) {
      toast.error("Error loading products");
    }
  };

  useEffect(() => {
    fetchDashboardProducts()
      .then((data) => {
        setProductList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      const result = await deleteProduct(selectedId);
      if (result.success) {
        toast.success("Product deleted successfully!");
        await clearProductsCache();
        setProductList((prev) =>
          prev.filter((p) => p.product_id !== selectedId),
        );
      } else {
        toast.error("Failed to delete product from server");
      }
      setOpen(false);
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleSave = async (updatedProduct: any) => {
    await clearProductsCache();
    refreshProducts();
  };

  const handleAdd = async () => {
    await clearProductsCache();
    refreshProducts();
  };

  if (isLoading)
    return <div className="p-10 text-center">Loading Admin Dashboard...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between p-3 items-center">
        <h1 className="text-2xl font-bold text-flora-green">
          Products Management
        </h1>

        <button
          onClick={() => setAddOpen(true)}
          className="bg-[#C8E6C9] cursor-pointer text-[#4E6851] px-4 py-2 rounded-full hover:bg-[#2f5240] hover:text-white transition"
        >
          Add Product +
        </button>
      </div>

      {/* Table */}
      <table className="w-full border rounded-lg overflow-hidden">
        {/* Header */}
        <thead className="bg-[#3E6C4D42] text-flora-green text-left text-xl">
          <tr>
            <th className="p-3">Product Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="text-[#434842]">
          {productList.map((product) => (
            <tr key={product.product_id} className="border-t">
              <td className="p-3 font-medium">{product.product_name}</td>
              <td className="p-3">{product.category_name}</td>
              <td className="p-3">{formatCurrency(product.price)}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${product.status === "Out of Stock" ? "text-red-700 bg-red-100" : product.status === "Low Stock" ? "text-gray-600 bg-gray-200" : "text-green-700 bg-green-100"}`}
                >
                  {product.status || "No status"}
                </span>
              </td>

              {/* Actions */}
              <td className="p-3 flex gap-3">
                {/* Edit */}
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setEditOpen(true);
                  }}
                  className="text-[#737971] hover:text-blue-700 cursor-pointer"
                >
                  <Edit size={18} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    setSelectedId(product.product_id);
                    setOpen(true);
                  }}
                  className="text-[#737971] hover:text-red-700 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />

      {/* Edit Modal */}
      <EditProductModal
        key={selectedProduct?.product_id || "edit-modal"}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        product={selectedProduct}
        onSave={handleSave}
      />

      {/* Add Modal */}
      <AddProductModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
