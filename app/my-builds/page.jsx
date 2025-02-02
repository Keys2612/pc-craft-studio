"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BuildSummary from "@/components/BuildSummary";
import CurrentOrders from "@/components/CurrentOrders";
import OrderHistory from "@/components/OrderHistory";

const MyBuilds = () => {
  const [selectedBuild, setSelectedBuild] = useState("Build Summary");

  // Sample orders data
  const orders = [
    { id: "12345", parts: "CPU, Motherboard, RAM", status: "Complete", action: "View" },
    { id: "12346", parts: "Graphics Card, PSU", status: "In Progress", action: "View" },
    { id: "12347", parts: "SSD, Cooling Fan", status: "Pending", action: "Cancel" },
    { id: "12348", parts: "SSD, Cooling Fan", status: "Rejected", action: "View" },
  ];

  const renderContent = () => {
    switch (selectedBuild) {
      case "Build Summary":
        return <BuildSummary />;
      case "Current Orders":
        return <CurrentOrders orders={orders} />; // ✅ Pass `orders` as a prop
      case "Order History":
        return <OrderHistory />;
      default:
        return <p>No selection.</p>;
    }
  };

  return (
    <div className="flex">
      <Sidebar setSelectedBuild={setSelectedBuild} />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default MyBuilds;