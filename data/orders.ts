export type OrderStatus = "processing" | "delivered" | "out for delivery";

export type Order = {
  order_id: number;
  date: string;
  customer: string;
  status: OrderStatus;
  total: number;
};

export const ordersData: Order[] = [
  {
    order_id: 1001,
    date: "2026-04-25",
    customer: "Ahmed Ali",
    status: "processing",
    total: 320,
  },
  {
    order_id: 1002,
    date: "2026-04-26",
    customer: "Sara Mohamed",
    status: "delivered",
    total: 450,
  },
  {
    order_id: 1003,
    date: "2026-04-27",
    customer: "Omar Khaled",
    status: "out for delivery",
    total: 210,
  },
  {
    order_id: 1004,
    date: "2026-04-27",
    customer: "Laila Hassan",
    status: "processing",
    total: 600,
  },
  {
    order_id: 1005,
    date: "2026-04-28",
    customer: "Youssef Mostafa",
    status: "delivered",
    total: 150,
  },
  {
    order_id: 1006,
    date: "2026-04-28",
    customer: "Mariam Adel",
    status: "out for delivery",
    total: 380,
  },
  {
    order_id: 1007,
    date: "2026-04-29",
    customer: "Hassan Tarek",
    status: "processing",
    total: 275,
  },
  {
    order_id: 1008,
    date: "2026-04-29",
    customer: "Nour Ahmed",
    status: "delivered",
    total: 510,
  },
  {
    order_id: 1009,
    date: "2026-04-30",
    customer: "Kareem Samir",
    status: "processing",
    total: 190,
  },
  {
    order_id: 1010,
    date: "2026-05-01",
    customer: "Dina Emad",
    status: "out for delivery",
    total: 420,
  },
];