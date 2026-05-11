"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  fetchDashboardOrders,
  updateOrderStatus,
} from "@/server/dashboard.server";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchDashboardOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (
    id: number,
    rawId: number,
    newStatus: string,
  ) => {
    setUpdatingId(rawId);

    const result = await updateOrderStatus(rawId, newStatus);
    if (result.success) {
      setOrders((prev) =>
        prev.map((order) =>
          order.raw_order_id === rawId
            ? { ...order, status: newStatus }
            : order,
        ),
      );
    }

    setUpdatingId(null);
  };

  const getStatusStyle = (status: any) => {
    // تم تعديل الكلمات هنا عشان تتطابق مع الحروف الـ Capital
    switch (status) {
      case "Processing":
        return "bg-[#4C6247] text-[#000000] border-[#4C6247CF]";

      case "Out for Delivery":
        return "bg-[#FFFFFF] text-[#4C6247] border-[#4C6247]";

      case "Delivered":
        return "bg-[#4C624757] text-flora-green border-[#4C6247]";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  return (
    <div className="w-full">
      <h1 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl text-flora-green">
        Orders Management
      </h1>

      <div className="w-full overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="overflow-hidden w-full min-w-187.5">
          <thead className="bg-[#3E6C4D42] text-left text-base md:text-xl text-flora-green">
            <tr>
              <th className="p-3 whitespace-nowrap md:p-4">Order ID</th>
              <th className="p-3 whitespace-nowrap md:p-4">Date</th>
              <th className="p-3 whitespace-nowrap md:p-4">Customer</th>
              <th className="p-3 whitespace-nowrap md:p-4">Status</th>
              <th className="p-3 whitespace-nowrap md:p-4">Total</th>
            </tr>
          </thead>

          <tbody className="text-sm md:text-base">
            {orders.map((order) => (
              <tr
                key={order.order_id}
                className="transition-colors border-t text-flora-green hover:bg-gray-50/50"
              >
                <td className="p-3 whitespace-nowrap md:p-4">
                  {order.order_id}
                </td>
                <td className="p-3 whitespace-nowrap md:p-4">
                  {order.order_date}
                </td>
                <td className="p-3 whitespace-nowrap md:p-4">
                  {order.customer_name}
                </td>

                <td className="relative p-3 whitespace-nowrap md:p-4">
                  <select
                    disabled={updatingId === order.raw_order_id}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.order_id,
                        order.raw_order_id,
                        e.target.value,
                      )
                    }
                    className={`border rounded-xl px-2 py-1 outline-none cursor-pointer text-xs md:text-sm font-medium transition-opacity ${
                      updatingId === order.raw_order_id
                        ? "opacity-50"
                        : "opacity-100"
                    } ${getStatusStyle(order.status)}`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  {updatingId === order.raw_order_id && (
                    <span className="absolute w-4 h-4 border-2 border-green-600 rounded-full right-0 top-1/2 -translate-y-1/2 animate-spin border-t-transparent"></span>
                  )}
                </td>
                <td className="p-3 whitespace-nowrap md:p-4">
                  {formatCurrency(order.order_total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
