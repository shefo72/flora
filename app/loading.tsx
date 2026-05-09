import React from "react";
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FCFBF8]">
      <Loader2 className="w-12 h-12 animate-spin text-gray-800" />
      <p className="mt-4 text-gray-500 font-medium tracking-wider animate-pulse">
        Loading...
      </p>
    </div>
  );
}
