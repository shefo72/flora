"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateCartQuantity, removeFromCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

import UserGuard from "@/components/Guards/UserGuard";

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: cart,
    summary,
    isLoading,
  } = useSelector((state: RootState) => state.cart);

  function handleIncrease(item: any) {
    dispatch(
      updateCartQuantity({
        cart_id: item.cart_id,
        quantity: item.quantity + 1,
      }),
    );
  }

  function handleDecrease(item: any) {
    if (item.quantity > 1) {
      dispatch(
        updateCartQuantity({
          cart_id: item.cart_id,
          quantity: item.quantity - 1,
        }),
      );
    }
  }

  function handleRemove(cartId: number) {
    dispatch(removeFromCart({ cart_id: cartId }));
  }

  if (isLoading && cart.length === 0) {
    return <div className="py-20 text-center">Loading your cart...</div>;
  }

  return (
    <UserGuard>
      <>
        {isLoading && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/40 backdrop-blur-sm"></div>
        )}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a]">
              My Cart
            </h1>
            <p className="text-sm text-[#888] mt-1 font-light">
              Hand-curated selections for your blooming journey.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT - Cart Items */}
            <div className="flex-1">
              {/* Table Header - Hidden on Mobile */}
              <div className="hidden md:grid grid-cols-12 text-xs font-medium uppercase tracking-widest text-[#999] pb-3 border-b border-[#ddd]">
                <div className="col-span-6">Product Name</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Empty State */}
              {cart.length === 0 && (
                <div className="py-20 text-center italic">
                  <p className="text-gray-500 mb-4">
                    Your cart is currently empty.
                  </p>
                  <Link
                    href="products"
                    className="underline text-green-800 font-semibold hover:text-green-900 transition"
                  >
                    Continue to products
                  </Link>
                </div>
              )}

              {/* Items Loop */}
              {cart.map((item) => (
                <div
                  key={item.cart_id}
                  className="flex flex-col md:grid md:grid-cols-12 items-center py-6 border-b border-[#e8e3da] gap-4 md:gap-0"
                >
                  {/* Product & Name */}
                  <div className="col-span-6 w-full flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-[#1a1a1a] text-lg md:text-base">
                        {item.product_name}
                      </p>
                      <button
                        onClick={() => handleRemove(item.cart_id)}
                        disabled={isLoading}
                        className="mt-1.5 flex items-center gap-1 text-sm text-red-500 hover:underline cursor-pointer disabled:opacity-50"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price - Visible on Mobile as a label */}
                  <div className="md:hidden flex justify-between w-full text-sm border-t border-gray-50 pt-4">
                    <span className="text-gray-400">Unit Price:</span>
                    <span className="text-[#444]">
                      {formatCurrency(item.price)}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 w-full md:w-auto flex items-center justify-between md:justify-center gap-3">
                    <span className="md:hidden text-sm text-gray-400 font-medium">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item)}
                        disabled={item.quantity === 1 || isLoading}
                        className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-50 transition cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item)}
                        disabled={isLoading}
                        className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-50 transition cursor-pointer disabled:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price - Hidden on Mobile (Desktop version) */}
                  <div className="hidden md:block col-span-2 text-right text-sm text-[#444]">
                    {formatCurrency(item.price)}
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-2 w-full md:w-auto flex justify-between md:justify-end items-center md:block border-t md:border-none border-gray-50 pt-4 md:pt-0">
                    <span className="md:hidden font-medium text-[#1a1a1a]">
                      Subtotal:
                    </span>
                    <span className="font-semibold text-[#1a1a1a] text-lg md:text-base">
                      {formatCurrency(item.line_total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - Summary */}
            {cart.length > 0 && (
              <div className="w-full lg:w-80 shrink-0">
                <div className="bg-[#fcfcfc] rounded-2xl p-6 shadow-sm border border-[#e8e3da] sticky top-8">
                  <h2 className="text-lg font-medium mb-4 border-b pb-2">
                    Order Summary
                  </h2>

                  <div className="flex justify-between text-sm text-[#666] mb-3">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1a1a1a]">
                      {formatCurrency(summary.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-[#666] pb-4 border-b border-[#eee]">
                    <span>Shipping</span>
                    <span className="text-[#2d5a3d] font-medium">
                      {summary.shipping === 0
                        ? "Free"
                        : formatCurrency(summary.shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4 mb-6">
                    <span className="text-lg font-semibold text-[#1a1a1a]">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#1a1a1a]">
                      {formatCurrency(summary.grand_total)}
                    </span>
                  </div>

                  <button
                    disabled={isLoading || cart.length === 0}
                    onClick={() => {
                      if (cart.length === 0) return;
                      router.push("/checkout");
                    }}
                    className="w-full bg-[#2d5a3d] cursor-pointer text-white text-base font-medium py-4 rounded-xl hover:bg-[#1e3d29] active:scale-[0.98] transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="flex flex-col items-center gap-2 mt-4">
                    <p className="flex items-center justify-center gap-1.5 text-[10px] text-[#aaa] tracking-widest uppercase font-bold">
                      🔒 Secure Payment Processing
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </>
    </UserGuard>
  );
}
