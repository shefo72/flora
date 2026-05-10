"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);

  const { isAuthenticated, userInfo } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated !== undefined) {
        setIsReady(true);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isReady) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (userInfo?.role !== "admin") {
        router.replace("/");
      }
    }
  }, [isReady, isAuthenticated, userInfo, router]);

  if (!isReady || (isAuthenticated && userInfo?.role !== "admin")) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-9999">
        <div className="w-10 h-10 border-4 border-[#2d5a3d] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-medium text-gray-500 tracking-widest uppercase">
          Verifying Identity...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
