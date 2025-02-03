"use client";

import { useParts } from "@/context/PartsContext";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BuildSummary from "@/components/BuildSummary";
import CurrentOrders from "@/components/CurrentOrders";
import OrderHistory from "@/components/OrderHistory";

const MyBuilds = () => {
  const [selectedBuild, setSelectedBuild] = useState("Build Summary");
  const { currentOrders } = useParts(); // ✅ Get orders from context

  const renderContent = () => {
    switch (selectedBuild) {
      case "Build Summary":
        return <BuildSummary />;
      case "Current Orders":
        return <CurrentOrders orders={currentOrders} />; // ✅ Pass updated orders
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
