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
      const savedAuth = localStorage.getItem("authInfo");
      const parsedAuth = savedAuth ? JSON.parse(savedAuth) : null;

      const auth = isAuthenticated || parsedAuth?.isAuthenticated;
      const role = userInfo?.role || parsedAuth?.userInfo?.role;

      if (!auth) {
        router.replace("/login");
      } else if (role !== "admin") {
        router.replace("/");
      } else {
        setIsReady(true);
      }
    };

    const timer = setTimeout(checkAuth, 50);
    return () => clearTimeout(timer);
  }, [isAuthenticated, userInfo, router]);

  if (!isReady) {
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
