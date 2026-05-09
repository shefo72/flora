"use client";

import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/axios";

import DeleteModal from "@/components/DeleteModal";
import EditProductModal from "@/components/EditProductModal";
import AddProductModal from "@/components/AddProductModal";

export default function ProductsPage() {
  const [productList, setProductList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products.php");
        setProductList(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [addOpen, setAddOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      setProductList((prev) => prev.filter((p) => p.product_id !== selectedId));
      setOpen(false);
    } catch (error) {
      alert("Error deleting product");
    }
  };

  const handleSave = async () => {};
  const handleAdd = async () => {};

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
              {/* Name */}
              <td className="p-3 font-medium">{product.product_name}</td>

              {/* Category */}
              <td className="p-3">{product.category_name}</td>

              {/* Price */}
              <td className="p-3">${product.price}</td>

              {/* Status */}
              <td className="p-3">
                <span
                //   className={`px-3 py-1 rounded-full text-sm ${
                //     product.status,
                // }`}
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
