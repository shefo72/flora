"use client";

import { useState } from "react";
import { ordersData,Order, OrderStatus } from "@/app/data/orders";
import { Trash2 } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ordersData);

  // 🟢 تغيير الحالة
  const handleStatusChange = (
    id: number,
    newStatus: OrderStatus
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.order_id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };
  const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case "processing":
      return "bg-[#4C6247] text-[#000000] border-[#4C6247CF]";

    case "out for delivery":
      return "bg-[#FFFFFF] text-[#4C6247] border-[#4C6247]";

    case "delivered":
      return "bg-[#4C624757] text-[#3E6C4D] border-[#4C6247]";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

  // 🔴 حذف أوردر
  const handleDelete = (id: number) => {
    setOrders((prev) =>
      prev.filter((order) => order.order_id !== id)
    );
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6 text-[#3E6C4D]">
        Orders Management
      </h1>

      <table className="w-full border rounded-lg overflow-hidden">

        {/* Header */}
        <thead className="bg-[#3E6C4D42] text-left text-xl text-[#3E6C4D]">
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">Date</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Status</th>
            <th className="p-3">Total</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id} className="border-t text-[#3E6C4D]">

              <td className="p-3">{order.order_id}</td>
              <td className="p-3">{order.date}</td>
              <td className="p-3">{order.customer}</td>

              {/* Status Dropdown */}
            <td className="p-3">
  <select
    value={order.status}
    onChange={(e) =>
      handleStatusChange(
        order.order_id,
        e.target.value as OrderStatus
      )
    }
    className={`border rounded-xl px-2 py-1 ${getStatusStyle(
      order.status
    )}`}
  >
    <option value="processing">Processing</option>
    <option value="out for delivery">Out for delivery</option>
    <option value="delivered">Delivered</option>
  </select>
</td>
              <td className="p-3">${order.total}</td>

              {/* Delete */}
              <td className="p-3">
                <button
                  onClick={() => handleDelete(order.order_id)}
                  className="text-[#37443457] hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}