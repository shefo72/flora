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
import { toast } from "react-toastify";
import { addProduct } from "@/server/dashboard.server";
import Image from "next/image";
import { uploadImage } from "./../lib/uploadImage";

type Product = {
  product_name: string;
  category_id: number;
  price: number;
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
  const initialForm: Product = {
    product_name: "",
    category_id: 1,
    price: 0,
    stock: 0,
    status: "in stock",
    description: "",
    image: "",
  };

  const [form, setForm] = useState<Product>(initialForm);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (key: keyof Product, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!imageFile) {
        toast.error("Please select an image");
        setLoading(false);
        return;
      }

      const imageUrl = await uploadImage(imageFile);

      const payload = {
        product_name: form.product_name,
        category_id: form.category_id,
        collections: "Quiet Elegance",
        price: form.price.toString(),
        stock: form.stock,
        status: form.status,
        description: form.description,
        image_url: imageUrl,
      };

      const result = await addProduct(payload);

      if (result.success) {
        toast.success("Product added successfully!");
        setForm(initialForm);
        setImageFile(null);
        onAdd(form);
        onClose();
      } else {
        toast.error(result.message || "Failed to add product");
      }
    } catch (error) {
      toast.error("Something went wrong during product addition");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#4A654E]">
            Add New Product
          </DialogTitle>
          <p className="text-[#434842]">
            Enter details for the new floral addition.
          </p>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <label className="text-sm text-[#434842]">Product Name</label>
            <input
              className="border p-2 w-full rounded focus:ring-1 focus:ring-green-500 outline-none"
              value={form.product_name}
              onChange={(e) => handleChange("product_name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#434842]">Category</label>
              <select
                className="border p-2 w-full rounded outline-none"
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
            <div>
              <label className="text-sm text-[#434842]">Status</label>
              <select
                className="border p-2 w-full rounded outline-none"
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
            <div>
              <label className="text-sm text-[#434842]">Price (EGP)</label>
              <input
                type="number"
                className="border p-2 w-full rounded outline-none"
                value={form.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm text-[#434842]">Stock</label>
              <input
                type="number"
                className="border p-2 w-full rounded outline-none"
                value={form.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#434842]">Description</label>
            <textarea
              className="border p-2 w-full rounded outline-none h-24"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-[#434842]">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full rounded text-sm"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setImageFile(file);

                const reader = new FileReader();
                reader.onloadend = () => {
                  handleChange("image", reader.result);
                };
                reader.readAsDataURL(file);
              }}
            />
            {/* Preview */}
            {form.image && (
              <div className="relative mt-2 w-20 h-20 border rounded overflow-hidden">
                <Image
                  src={form.image}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4 flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-[#434842] rounded-xl flex-1"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#C8E6C9] hover:bg-[#A5D6A7] text-[#4E6851] rounded-xl flex-1"
          >
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
