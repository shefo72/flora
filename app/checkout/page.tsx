"use client";
import React from "react";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.base_price * item.quantity,
    0,
  );

  const shipping = 0;
  const tax = subtotal * 0.3; // تقدري تغيريها
  const total = subtotal + tax + shipping;

  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    fullName: "",
    phone: "",
    date: "",
    address: "",
    city: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    console.log("ORDER:", { form, cart, total });
    alert("Order placed successfully 🎉");
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT - FORM */}
        <div className="flex-1">
          <h1 className="text-4xl font-semibold mb-8">Payment Details</h1>

          <div className="space-y-5">
            {/* Cardholder */}
            <div>
              <label className="block text-sm mb-1">Cardholder Name</label>
              <input
                className="border p-2 w-full rounded"
                placeholder="Florence Nightingale"
                value={form.cardName}
                onChange={(e) => handleChange("cardName", e.target.value)}
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm mb-1">Card Number</label>
              <input
                className="border p-2 w-full rounded"
                placeholder="0000 0000 0000 0000"
                value={form.cardNumber}
                onChange={(e) => handleChange("cardNumber", e.target.value)}
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                className="border p-2 w-full rounded"
                placeholder="Recipient name"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                className="border p-2 w-full rounded"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm mb-1">Delivery Date</label>
              <input
                className="border p-2 w-full rounded"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm mb-1">Address</label>
              <input
                className="border p-2 w-full rounded"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm mb-1">City</label>
              <input
                className="border p-2 w-full rounded"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>

            {/* Expiry + CVV */}
            <div className="flex gap-4">
              <input
                className="border p-2 w-full rounded"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={(e) => handleChange("expiry", e.target.value)}
              />
              <input
                className="border p-2 w-full rounded"
                placeholder="CVV"
                type="password"
                value={form.cvv}
                onChange={(e) => handleChange("cvv", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="w-full lg:w-80">
          <div className="bg-[#f0ede6] rounded-2xl p-6">
            <h2 className="font-semibold mb-5">Order Summary</h2>

            {/* Products */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product_id} className="flex gap-3">
                  <Image
                    src={item.image_url}
                    alt={item.product_name}
                    className="w-14 h-14 rounded object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product_name}</p>

                    <p className="text-xs text-gray-500">x{item.quantity}</p>

                    <p className="text-sm font-semibold">
                      ${(item.base_price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => setOpen(true)}
              className="mt-5 w-full bg-flora-green text-white py-3 rounded-xl"
            >
              Place Order (${total.toFixed(2)})
            </button>
          </div>
        </div>
        <OrderSuccessModal open={open} onClose={() => setOpen(false)} />
      </div>
    </main>
  );
}
