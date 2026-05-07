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

type Product = {
  product_id: number;
  product_name: string;
  category_name: string;
  base_price: number;
  status: string;
  stock: number;
  description: string;
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
  const [form, setForm] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  if (!form) return null;

  const handleChange = (key: keyof Product, value: any) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
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
              className="border p-2 rounded w-full bg-[#C3C8C0]"
              value={form.product_name}
              onChange={(e) => handleChange("product_name", e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-[#434842] mb-1 block">
              Category
            </label>

            <select
              className="border p-2 rounded w-full bg-[#C3C8C0]"
              value={form.category_name}
              onChange={(e) => handleChange("category_name", e.target.value)}
            >
              <option value="Romantic">Romantic</option>
              <option value="Seasonal">Seasonal</option>
              <option value="Wildflower">Wildflower</option>
              <option value="Wedding">Wedding</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-[#434842] mb-1 block">Status</label>
            <select
              className="border p-2 rounded w-full bg-[#C3C8C0]"
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="in stock">In stock</option>
              <option value="low stock">Low stock</option>
              <option value="out of stock">Out of stock</option>
            </select>
          </div>

          <div className="flex justify-between">
            {/* Price */}
            <div>
              <label className="text-sm text-[#434842] mb-1 block">Price</label>
              <input
                type="number"
                className="border p-2 rounded w-full  bg-[#C3C8C0]"
                value={form.base_price}
                onChange={(e) =>
                  handleChange("base_price", Number(e.target.value))
                }
              />
            </div>

            {/* Stock */}
            <div>
              <label className="text-sm text-[#434842] mb-1 block">Stock</label>
              <input
                type="number"
                className="border p-2 rounded w-full  bg-[#C3C8C0]"
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
              className="border p-2 rounded w-full bg-[#C3C8C0]"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-[#EFEDED] text-[#434842] rounded-xl"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="bg-[#C8E6C9] text-[#4E6851] rounded-xl  hover:bg-green-100"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
