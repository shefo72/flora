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
    switch (status) {
      case "processing":
        return "bg-[#4C6247] text-[#000000] border-[#4C6247CF]";

      case "out for delivery":
        return "bg-[#FFFFFF] text-[#4C6247] border-[#4C6247]";

      case "delivered":
        return "bg-[#4C624757] text-flora-green border-[#4C6247]";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-flora-green">
        Orders Management
      </h1>

      <div className="w-full overflow-x-auto border rounded-lg bg-white shadow-sm">
        <table className="w-full min-w-187.5 overflow-hidden">
          <thead className="bg-[#3E6C4D42] text-left text-base md:text-xl text-flora-green">
            <tr>
              <th className="p-3 md:p-4 whitespace-nowrap">Order ID</th>
              <th className="p-3 md:p-4 whitespace-nowrap">Date</th>
              <th className="p-3 md:p-4 whitespace-nowrap">Customer</th>
              <th className="p-3 md:p-4 whitespace-nowrap">Status</th>
              <th className="p-3 md:p-4 whitespace-nowrap">Total</th>
            </tr>
          </thead>

          <tbody className="text-sm md:text-base">
            {orders.map((order) => (
              <tr
                key={order.order_id}
                className="border-t text-flora-green hover:bg-gray-50/50 transition-colors"
              >
                <td className="p-3 md:p-4 whitespace-nowrap">
                  {order.order_id}
                </td>
                <td className="p-3 md:p-4 whitespace-nowrap">
                  {order.order_date}
                </td>
                <td className="p-3 md:p-4 whitespace-nowrap">
                  {order.customer_name}
                </td>

                <td className="p-3 md:p-4 whitespace-nowrap relative">
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
                    <option value="processing">Processing</option>
                    <option value="out for delivery">Out for delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  {updatingId === order.raw_order_id && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full"></span>
                  )}
                </td>
                <td className="p-3 md:p-4 whitespace-nowrap">
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
