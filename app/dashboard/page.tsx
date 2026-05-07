import React from "react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard/orders");
}
