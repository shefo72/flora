import React from "react";
import DashboardSidebar from "../../components/admin/DashboardSidebar";
import AdminGuard from "@/components/Guards/AdminGuard";
import Providers from "../../components/providers/providers";
import { ToastContainer, Bounce } from "react-toastify";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AdminGuard>
        <div className="flex h-screen overflow-hidden bg-gray-50">
          <DashboardSidebar />

          <div className="flex-1 ml-16 sm:ml-64 flex flex-col transition-all duration-300 overflow-y-auto">
            <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </AdminGuard>
    </Providers>
  );
}
