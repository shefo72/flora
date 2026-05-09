"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateCartQuantity, removeFromCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

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
    <>
      {isLoading && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/40"></div>
      )}
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

            {/* Empty State */}
            {cart.length === 0 && (
              <div className="py-12 text-center  italic">
                <p className="text-gray-500 ">Your cart is currently empty.</p>
                <Link
                  href="products"
                  className="underline text-green-800 font-semibold"
                >
                  Continue to products
                </Link>
              </div>
            )}

            {/* Items */}
            {cart.map((item) => (
              <div
                key={item.cart_id}
                className="grid grid-cols-12 items-center py-6 border-b border-[#e8e3da]"
              >
                {/* Product */}
                <div className="col-span-6 flex items-center gap-4">
                  <div>
                    <p className="font-medium text-[#1a1a1a]">
                      {item.product_name}
                    </p>
                    <button
                      onClick={() => handleRemove(item.cart_id)}
                      disabled={isLoading}
                      className="mt-1.5 flex items-center gap-1 text-sm text-red-500 hover:underline cursor-pointer"
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleDecrease(item)}
                    disabled={item.quantity == 1}
                    className={`px-2 py-0.5 border rounded hover:bg-gray-50 transition cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(item)}
                    disabled={isLoading}
                    className="px-2 py-0.5 border rounded hover:bg-gray-50 transition cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="col-span-2 text-right text-sm text-[#444]">
                  {formatCurrency(item.price)}
                </div>

                {/* Subtotal */}
                <div className="col-span-2 text-right font-medium text-[#1a1a1a]">
                  {formatCurrency(item.line_total)}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - Summary */}
          {cart.length > 0 && (
            <div className="w-full lg:w-72 shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e3da] sticky top-8">
                <div className="flex justify-between text-sm text-[#666] mb-3">
                  <span>Subtotal</span>
                  <span>{formatCurrency(summary.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm text-[#666] pb-4 border-b border-[#eee]">
                  <span>Shipping</span>
                  <span className="text-[#2d5a3d] font-medium">
                    {formatCurrency(summary.shipping)}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4 mb-6">
                  <span className="text-lg font-semibold text-[#1a1a1a]">
                    Total
                  </span>
                  <span className="text-2xl font-semibold text-[#1a1a1a]">
                    {formatCurrency(summary.grand_total)}
                  </span>
                </div>

                <button
                  disabled={isLoading || cart.length === 0}
                  onClick={() => {
                    if (cart.length === 0) {
                      alert("Cart is empty!");
                      return;
                    }
                    router.push("/checkout");
                  }}
                  className="w-full bg-[#2d5a3d] cursor-pointer text-white text-sm font-medium py-3.5 rounded-xl hover:bg-[#1e3d29] transition shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[10px] text-[#aaa] mt-4 tracking-widest uppercase font-bold">
                  🔒 Secure Payment Processing
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
