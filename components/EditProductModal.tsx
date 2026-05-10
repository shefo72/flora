"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { editProduct } from "@/server/dashboard.server";

type Product = {
  product_id: number;
  product_name: string;
  category_id: number;
  collections: string;
  price: number;
  stock: number;
  status: string;
  description: string;
  image_url: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
};

export default function EditProductModal({
  open,
  onClose,
  product,
  onSave,
}: Props) {
  const [form, setForm] = useState<Product | null>(product);
  const [loading, setLoading] = useState(false);

  if (!form) return null;

  const handleChange = (key: keyof Product, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleEditSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        product_name: form.product_name,
        category_id: form.category_id,
        collections: "Quiet Elegance",
        price: form.price.toString(),
        stock: form.stock,
        status: form.status,
        description: form.description,
        image_url: form.image_url,
      };

      const result = await editProduct(form.product_id, payload);

      if (result.success) {
        toast.success("Product updated successfully!");
        onSave(form);
        onClose();
      } else {
        toast.error(result.message || "Failed to update product");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Product</DialogTitle>
          <p className="text-[#434842] pb-3">Update product details</p>
        </DialogHeader>

        <div className="grid gap-3">
          {/* Product Name */}
          <div>
            <label className="text-sm text-[#434842] mb-1 block">
              Product Name
            </label>
            <input
              className="border p-2 rounded w-full outline-none focus:ring-1 focus:ring-green-500"
              value={form.product_name}
              onChange={(e) => handleChange("product_name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="text-sm text-[#434842] mb-1 block">
                Category
              </label>
              <select
                className="border p-2 rounded w-full outline-none"
                value={form.category_id}
                onChange={(e) =>
                  handleChange("category_id", Number(e.target.value))
                }
              >
                <option value={1}>Romantic</option>
                <option value={2}>Seasonal</option>
                <option value={3}>Wildflower</option>
                <option value={4}>Wedding</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-[#434842] mb-1 block">
                Status
              </label>
              <select
                className="border p-2 rounded w-full outline-none"
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="In Stock">In stock</option>
                <option value="Low Stock">Low stock</option>
                <option value="Out of Stock">Out of stock</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="text-sm text-[#434842] mb-1 block">Price</label>
              <input
                type="number"
                className="border p-2 rounded w-full outline-none"
                value={form.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>

            {/* Stock */}
            <div>
              <label className="text-sm text-[#434842] mb-1 block">Stock</label>
              <input
                type="number"
                className="border p-2 rounded w-full outline-none"
                value={form.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-[#434842] mb-1 block">
              Description
            </label>
            <textarea
              className="border p-2 rounded w-full outline-none h-24"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-[#EFEDED] text-[#434842] rounded-xl flex-1"
          >
            Cancel
          </Button>

          <Button
            onClick={handleEditSubmit}
            disabled={loading}
            className="bg-[#C8E6C9] text-[#4E6851] rounded-xl hover:bg-green-100 flex-1"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
