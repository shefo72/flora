"use client";

import { useState } from "react";
import { ordersData, Order, OrderStatus } from "@/data/orders";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ordersData);

  const handleStatusChange = (id: number, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.order_id === id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const getStatusStyle = (status: OrderStatus) => {
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

  const handleDelete = (id: number) => {
    setOrders((prev) => prev.filter((order) => order.order_id !== id));
  };

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
              <th className="p-3 md:p-4 whitespace-nowrap">Action</th>
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
                <td className="p-3 md:p-4 whitespace-nowrap">{order.date}</td>
                <td className="p-3 md:p-4 whitespace-nowrap">
                  {order.customer}
                </td>

                <td className="p-3 md:p-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.order_id,
                        e.target.value as OrderStatus,
                      )
                    }
                    className={`border rounded-xl px-2 py-1 outline-none cursor-pointer text-xs md:text-sm font-medium ${getStatusStyle(
                      order.status,
                    )}`}
                  >
                    <option value="processing">Processing</option>
                    <option value="out for delivery">Out for delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="p-3 md:p-4 whitespace-nowrap">
                  {formatCurrency(order.total)}
                </td>

                <td className="p-3 md:p-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(order.order_id)}
                    className="text-[#37443457] hover:text-red-600 transition-colors cursor-pointer p-1"
                  >
                    <Trash2 size={18} className="md:w-5 md:h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
