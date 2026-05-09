"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, userInfo } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (userInfo?.role !== "admin") {
      router.push("/");
    }
  }, [isAuthenticated, userInfo, router]);

  if (isAuthenticated && userInfo?.role === "admin") {
    return <>{children}</>;
  }

  return null;
}
