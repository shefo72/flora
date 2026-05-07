"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

type Product = {
  product_id: number;
  product_name: string;
  category_name: string;
  base_price: number;
  stock: number;
  status: string;
  description: string;
  image?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
};

export default function AddProductModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState<Product>({
    product_id: Date.now(),
    product_name: "",
    category_name: "Romantic",
    base_price: 0,
    stock: 0,
    status: "in stock",
    description: "",
    image: "",
  });

  const handleChange = (key: keyof Product, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    onAdd(form);

    // reset form
    setForm({
      product_id: Date.now(),
      product_name: "",
      category_name: "Romantic",
      base_price: 0,
      stock: 0,
      status: "in stock",
      description: "",
      image: "",
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#4A654E]">
            Add New Product
          </DialogTitle>
          <p className="text-[#434842]">
            Enter details for the new floral addition.
          </p>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Product Name */}
          <div>
            <label className="text-sm text-[#434842]">Product Name</label>
            <input
              className="border p-2 w-full rounded"
              value={form.product_name}
              onChange={(e) => handleChange("product_name", e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            {/* Category */}
            <div>
              <label className="text-sm text-[#434842]">Category</label>
              <select
                className="border p-2 w-full rounded"
                value={form.category_name}
                onChange={(e) => handleChange("category_name", e.target.value)}
              >
                <option>Romantic</option>
                <option>Seasonal</option>
                <option>Wildflower</option>
                <option>Wedding</option>
              </select>
            </div>
            {/* Status */}
            <div>
              <label className="text-sm text-[#434842]">Status</label>
              <select
                className="border p-2 w-full rounded"
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="in stock">In stock</option>
                <option value="low stock">Low stock</option>
                <option value="out of stock">Out of stock</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            {/* Price */}
            <div>
              <label className="text-sm text-[#434842]">Price</label>
              <input
                type="number"
                className="border p-2 w-full rounded"
                value={form.base_price}
                onChange={(e) =>
                  handleChange("base_price", Number(e.target.value))
                }
              />
            </div>

            {/* Stock */}
            <div>
              <label className="text-sm text-[#434842]">Stock</label>
              <input
                type="number"
                className="border p-2 w-full rounded"
                value={form.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-[#434842]">Description</label>
            <textarea
              className="border p-2 w-full rounded"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Image Upload (UI only) */}
          <div>
            <label className="text-sm text-[#434842]">Product Image</label>

            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full rounded"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();

                reader.onloadend = () => {
                  handleChange("image", reader.result);
                };

                reader.readAsDataURL(file);
              }}
            />

            {/* Preview */}
            {form.image && (
              <Image
                src={form.image}
                alt="preview"
                className="mt-2 w-24 h-24 object-cover rounded"
              />
            )}
          </div>
        </div>

        <DialogFooter className="mt-4 flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-[#434842] rounded-xl"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            className="bg-[#C8E6C9] text-[#4E6851] rounded-xl"
          >
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
