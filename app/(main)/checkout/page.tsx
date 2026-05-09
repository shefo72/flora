"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { processCheckout } from "@/server/checkout.server";
import { fetchCart } from "@/store/cartSlice";

import UserGuard from "@/components/Guards/UserGuard";

export default function CheckoutPage() {
  const {
    items: cart,
    summary,
    isLoading,
  } = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      customer_id: 1,
      shipping: {
        first_name: data.firstName,
        last_name: data.lastName,
        street_address: data.address,
        city: data.city,
        state: data.state || "NY",
        zip: data.zipCode,
        shipping_method: "Standard local delivery",
      },
      payment: {
        card_number: data.cardNumber,
        expiration_date: data.expiryDate,
        cvv: data.cvv,
      },
    };

    const result = await processCheckout(payload);

    if (result.success) {
      dispatch(fetchCart(1));
      toast.success("Order placed successfully");
      setOpen(true);
    } else {
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <UserGuard>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT - FORM */}
          <div className="flex-1">
            <h1 className="text-4xl font-semibold mb-8">Checkout Details</h1>

            <form
              id="checkout-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* --- Shipping Section --- */}
              <div className="bg-white p-6 border rounded-xl shadow-sm space-y-4">
                <h2 className="text-lg font-medium border-b pb-2">
                  Shipping Address
                </h2>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm mb-1">First Name</label>
                    <input
                      required
                      {...register("firstName")}
                      className="border p-2 w-full rounded"
                      placeholder="Florence"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm mb-1">Last Name</label>
                    <input
                      required
                      {...register("lastName")}
                      className="border p-2 w-full rounded"
                      placeholder="Nightingale"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Street Address</label>
                  <input
                    required
                    {...register("address")}
                    className="border p-2 w-full rounded"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm mb-1">City</label>
                    <input
                      required
                      {...register("city")}
                      className="border p-2 w-full rounded"
                      placeholder="New York"
                    />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-sm mb-1">State</label>
                    <input
                      required
                      {...register("state")}
                      className="border p-2 w-full rounded"
                      placeholder="NY"
                      maxLength={10}
                    />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-sm mb-1">Zip Code</label>
                    <input
                      required
                      {...register("zipCode")}
                      className="border p-2 w-full rounded"
                      placeholder="10001"
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>

              {/* --- Payment Section --- */}
              <div className="bg-white p-6 border rounded-xl shadow-sm space-y-4">
                <h2 className="text-lg font-medium border-b pb-2">
                  Payment Info
                </h2>

                <div>
                  <label className="block text-sm mb-1">Card Number</label>
                  <input
                    required
                    {...register("cardNumber")}
                    className="border p-2 w-full rounded"
                    placeholder="1234 5678 1234 5678"
                    maxLength={16}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm mb-1">
                      Expiration Date
                    </label>
                    <input
                      {...register("expiryDate", {
                        required: "Required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                          message: "Invalid  Data , Use MM/YY format",
                        },
                      })}
                      className="border p-2 w-full rounded"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors?.expiryDate && (
                      <span className="text-red-600 text-[12px] font-semibold">
                        {errors.expiryDate.message as string}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm mb-1">CVV</label>
                    <input
                      required
                      {...register("cvv")}
                      type="password"
                      maxLength={3}
                      className="border p-2 w-full rounded"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="w-full lg:w-80">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="bg-[#f0ede6] rounded-2xl p-6 sticky top-8">
                <h2 className="font-semibold mb-5">Order Summary</h2>

                {/* Products */}
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.cart_id} className="flex gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.product_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold">
                          {formatCurrency(item.line_total)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 text-sm border-t border-[#ddd] pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(summary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-700 font-medium">
                      {formatCurrency(summary.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-[#ddd]">
                    <span>Total</span>
                    <span>{formatCurrency(summary.grand_total)}</span>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting || cart.length === 0}
                  className="mt-6 w-full bg-[#2d5a3d] cursor-pointer text-white py-3.5 rounded-xl disabled:opacity-50 hover:bg-[#1e3d29] transition flex justify-center items-center gap-2 font-medium"
                >
                  {isSubmitting ? "Processing..." : `Place Order`}
                </button>
              </div>
            )}
          </div>

          <OrderSuccessModal
            open={open}
            onClose={() => {
              setOpen(false);
              router.push("/");
            }}
          />
        </div>
      </main>
    </UserGuard>
  );
}
