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
    <div className="p-2 md:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 p-3 items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-flora-green text-center sm:text-left">
          Products Management
        </h1>

        <button
          onClick={() => setAddOpen(true)}
          className="w-full sm:w-auto bg-[#C8E6C9] cursor-pointer text-[#4E6851] px-6 py-2.5 rounded-full hover:bg-[#2f5240] hover:text-white transition shadow-sm font-medium"
        >
          Add Product +
        </button>
      </div>

      {/* Table Container - Scrollable on small screens */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header - Hidden on very small screens if you prefer card view, 
            but here we'll keep it scrollable for data integrity */}
            <thead className="bg-[#3E6C4D15] text-flora-green border-b border-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-bold uppercase tracking-wider">
                  Product Name
                </th>
                <th className="p-4 text-left text-sm font-bold uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="p-4 text-left text-sm font-bold uppercase tracking-wider">
                  Price
                </th>
                <th className="p-4 text-left text-sm font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-center text-sm font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-[#434842] divide-y divide-gray-50">
              {productList.map((product) => (
                <tr
                  key={product.product_id}
                  className="hover:bg-gray-50/50 transition"
                >
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {product.product_name}
                      </span>
                      {/* Category shown only on mobile under the name */}
                      <span className="text-xs text-gray-500 md:hidden">
                        {product.category_name}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 hidden md:table-cell">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {product.category_name}
                    </span>
                  </td>

                  <td className="p-4 font-medium">
                    {formatCurrency(product.price)}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        product.status === "Out of Stock"
                          ? "text-red-700 bg-red-50"
                          : product.status === "Low Stock"
                            ? "text-amber-700 bg-amber-50"
                            : "text-green-700 bg-green-50"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          product.status === "Out of Stock"
                            ? "bg-red-500"
                            : product.status === "Low Stock"
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                      ></span>
                      {product.status || "No status"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setEditOpen(true);
                        }}
                        className="p-2 text-[#737971] hover:text-blue-600 hover:bg-blue-50 rounded-full transition cursor-pointer"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedId(product.product_id);
                          setOpen(true);
                        }}
                        className="p-2 text-[#737971] hover:text-red-600 hover:bg-red-50 rounded-full transition cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals... (Keeping your existing modal logic) */}
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
      <EditProductModal
        key={selectedProduct?.product_id || "edit-modal"}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        product={selectedProduct}
        onSave={handleSave}
      />
      <AddProductModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
