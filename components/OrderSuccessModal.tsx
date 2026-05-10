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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300"
    >
      {/* CARD */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-10 w-full max-w-[340px] text-center transform transition-all animate-in fade-in zoom-in duration-300"
      >
        {/* ICON WRAPPER */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Decorative background circle */}
          <div className="absolute w-20 h-20 bg-green-50 rounded-full animate-pulse" />

          <div className="relative flex items-center justify-center gap-1">
            {/* Delivery Truck Icon */}
            <svg
              className="w-12 h-12 text-[#1a1a1a]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.2}
            >
              <rect x="1" y="9" width="13" height="10" rx="1.5" />
              <path d="M14 11h4l3 4v4h-7V11z" />
              <circle cx="5.5" cy="19.5" r="1.5" fill="white" />
              <circle cx="18.5" cy="19.5" r="1.5" fill="white" />
            </svg>

            {/* Checkmark Icon */}
            <div className="absolute -top-1 -right-2 bg-[#3a9e5f] rounded-full p-1 shadow-lg ring-4 ring-white">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="space-y-2 mb-8">
          <h3 className="text-xl font-bold text-[#1a1a1a] tracking-tight">
            Order Confirmed!
          </h3>
          <p className="text-[13px] text-[#777] leading-relaxed">
            Your blooms are being prepared. <br />
            Ready for more floral magic?
          </p>
        </div>

        {/* BUTTONS */}
        <div className="space-y-3">
          <button
            onClick={() => {
              onClose();
              router.push("/products");
            }}
            className="w-full bg-[#2d5a3d] hover:bg-[#1e3d29] text-white font-bold text-sm py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-green-900/20 active:scale-95"
          >
            Continue Shopping
          </button>

          <button
            onClick={onClose}
            className="w-full bg-transparent text-[#999] hover:text-[#555] font-medium text-xs py-2 transition-colors duration-200"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
