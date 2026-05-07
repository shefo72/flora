"use client";

import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function OrderSuccessModal({ open, onClose }: Props) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      {/* CARD */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl p-10 w-80 text-center"
      >
        {/* ICON */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <svg
            className="w-10 h-10 text-[#333]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.4}
          >
            <rect x="1" y="9" width="13" height="10" rx="1.5" />
            <path d="M14 11h4l3 4v4h-7V11z" />
            <circle cx="5.5" cy="19.5" r="1.5" />
            <circle cx="18.5" cy="19.5" r="1.5" />
          </svg>

          <svg
            className="w-6 h-6 text-[#3a9e5f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* TEXT */}
        <p className="text-xs font-semibold tracking-widest uppercase mb-2">
          Order Confirmed
        </p>

        <p className="text-sm text-[#888] mb-8">Want to Buy more Flowers?</p>

        {/* BUTTON */}
        <button
          onClick={() => {
            onClose();
            router.push("/products");
          }}
          className="w-full bg-white border border-[#e2ddd4] hover:border-[#2d5a3d] hover:text-[#2d5a3d] font-semibold text-sm py-3.5 rounded-xl transition"
        >
          Shop
        </button>
      </div>
    </div>
  );
}
