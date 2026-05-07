"use client";
import React from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.base_price * item.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;
  const router = useRouter();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-[#1a1a1a]">My Cart</h1>
        <p className="text-sm text-[#888] mt-1 font-light">
          Hand-curated selections for your blooming journey.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT */}
        <div className="flex-1">
          {/* Table Header */}
          <div className="grid grid-cols-12 text-xs font-medium uppercase tracking-widest text-[#999] pb-3 border-b border-[#ddd]">
            <div className="col-span-6">Product Name</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {/* Empty */}
          {cart.length === 0 && (
            <p className="py-6 text-gray-500">Cart is empty</p>
          )}

          {/* Items */}
          {cart.map((item) => (
            <div
              key={item.product_id}
              className="grid grid-cols-12 items-center py-6 border-b border-[#e8e3da]"
            >
              {/* Product */}
              <div className="col-span-6 flex items-center gap-4">
                <Image
                  src={item.image_url}
                  alt={item.product_name}
                  className="w-16 h-16 rounded-full object-cover shadow-sm"
                />

                <div>
                  <p className="font-medium text-[#1a1a1a]">
                    {item.product_name}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="mt-1.5 flex items-center gap-1 text-sm text-red-500"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => decreaseQty(item.product_id)}
                  className="px-2 border rounded"
                >
                  −
                </button>

                <span className="w-5 text-center text-sm">{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.product_id)}
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div className="col-span-2 text-right text-sm text-[#444]">
                ${item.base_price.toFixed(2)}
              </div>

              {/* Subtotal */}
              <div className="col-span-2 text-right font-medium text-[#1a1a1a]">
                ${(item.base_price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - Summary */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e3da]">
            <div className="flex justify-between text-sm text-[#666] mb-3">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-[#666] pb-4 border-b border-[#eee]">
              <span>Shipping</span>
              <span className="text-[#2d5a3d] font-medium">Free</span>
            </div>

            <div className="flex justify-between items-center mt-4 mb-6">
              <span className="text-lg font-semibold text-[#1a1a1a]">
                Total
              </span>
              <span className="text-2xl font-semibold text-[#1a1a1a]">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                if (cart.length === 0) {
                  alert("Cart is empty!");
                  return;
                }
                router.push("/checkout");
              }}
              className="w-full bg-flora-green text-white text-sm font-medium py-3.5 rounded-xl hover:bg-[#2f5240] transition"
            >
              Proceed to Checkout
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[10px] text-[#aaa] mt-3 tracking-widest uppercase">
              🔒 Secure Payment Processing
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
