"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AppDispatch } from "@/store/store";
import { clearCart } from "@/store/cartSlice";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormSchema, CheckoutFormValues } from "@/schema/api.schema";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items: cart } = useSelector((state: AppState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0,
  );

  const shipping = 0;
  const tax = subtotal * 0.3;
  const total = subtotal + tax + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    try {
      // POST to /checkout.php using Axios
      await api.post("/checkout.php", {
        ...data,
        cartItems: cart,
        total: total,
      });

      // On success: clear Redux cart, show success Toast
      dispatch(clearCart());
      toast.success("Order placed successfully 🎉");
      setOpen(true); // show modal
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT - FORM */}
        <div className="flex-1">
          <h1 className="text-4xl font-semibold mb-8">Payment Details</h1>

          <form
            id="checkout-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* First Name & Last Name */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">First Name</label>
                <input
                  {...register("firstName")}
                  className={`border p-2 w-full rounded ${errors.firstName ? "border-red-500" : ""}`}
                  placeholder="Florence"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  {...register("lastName")}
                  className={`border p-2 w-full rounded ${errors.lastName ? "border-red-500" : ""}`}
                  placeholder="Nightingale"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                {...register("email")}
                className={`border p-2 w-full rounded ${errors.email ? "border-red-500" : ""}`}
                placeholder="example@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                {...register("phone")}
                className={`border p-2 w-full rounded ${errors.phone ? "border-red-500" : ""}`}
                placeholder="+1 234 567 8900"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm mb-1">Address</label>
              <input
                {...register("address")}
                className={`border p-2 w-full rounded ${errors.address ? "border-red-500" : ""}`}
                placeholder="123 Main St"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City & Zip Code */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">City</label>
                <input
                  {...register("city")}
                  className={`border p-2 w-full rounded ${errors.city ? "border-red-500" : ""}`}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Zip Code</label>
                <input
                  {...register("zipCode")}
                  className={`border p-2 w-full rounded ${errors.zipCode ? "border-red-500" : ""}`}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                {...register("notes")}
                className="border p-2 w-full rounded"
                placeholder="Any special instructions?"
                rows={3}
              />
              {errors.notes && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.notes.message}
                </p>
              )}
            </div>
          </form>
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
                    src={item.image || "https://placehold.co/100"} // fallback if image is missing
                    alt={item.name || "Product"}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>

                    <p className="text-xs text-gray-500">x{item.quantity}</p>

                    <p className="text-sm font-semibold">
                      ${((Number(item.price) || 0) * item.quantity).toFixed(2)}
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
              type="submit"
              form="checkout-form"
              disabled={isSubmitting || cart.length === 0}
              className="mt-5 w-full bg-flora-green text-white py-3 rounded-xl disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                  Processing...
                </>
              ) : (
                `Place Order ($${total.toFixed(2)})`
              )}
            </button>
          </div>
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
  );
}
