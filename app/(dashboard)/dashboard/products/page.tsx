"use client";

import { Edit, Trash2 } from "lucide-react";
import { products as initialProducts } from "@/data/products";
import { useState } from "react";

import DeleteModal from "@/components/DeleteModal";
import EditProductModal from "@/components/EditProductModal";
import AddProductModal from "@/components/AddProductModal";

export default function ProductsPage() {
  // products state
  const [productList, setProductList] = useState(initialProducts);

  // delete state
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // edit state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [addOpen, setAddOpen] = useState(false);
  //  status colors
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "in stock":
        return "bg-[#C8E6C94D] text-[#4A654E]";

      case "low stock":
        return "bg-[#F5F3F3] text-[#434842]";

      case "out of stock":
        return "bg-[#FFDAD64D] text-[#BA1A1A]";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = () => {
    setProductList((prev) => prev.filter((p) => p.product_id !== selectedId));

    setOpen(false);
    setSelectedId(null);
  };

  //  save edited product
  const handleSave = (updated: any) => {
    setProductList((prev) =>
      prev.map((p) => (p.product_id === updated.product_id ? { ...p, ...updated } : p)),
    );
  };

  const handleAdd = (newProduct: any) => {
    setProductList((prev) => [...prev, newProduct]);
  };

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
            {/* <th className="p-3">Status</th> */}
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
              {/* <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                    product.status,
                  )}`}
                >
                  {product.status || "No status"}
                </span>
              </td> */}

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
