"use client";
import { useState } from "react";
import TechnicianOrders from "@/components/TechnicianOrders";
import TechnicianCurrentBuild from "@/components/TechnicianCurrentBuild";
import TechnicianBuildHistory from "@/components/TechnicianBuildHistory";

const TechnicianHome = () => {
  const [selectedTab, setSelectedTab] = useState("Available Orders");

  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[1600px] flex">
        {/* Sidebar */}
        <aside className="w-1/4 h-screen bg-white shadow-lg p-6">
          <h2 className="font-bold text-lg mb-4">My Builds</h2>
          <ul className="space-y-3">
            {["Available Orders", "Current Build", "Build History"].map((item) => (
              <li
                key={item}
                className={`cursor-pointer px-3 py-2 rounded-lg ${
                  selectedTab === item ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedTab(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content - Switch Component Based on Tab */}
        <main className="flex-1 bg-white shadow-lg p-6">
          {selectedTab === "Available Orders" && <TechnicianOrders selectedTab={selectedTab} />}
          {selectedTab === "Current Build" && <TechnicianCurrentBuild />}
          {/* Placeholder for Build History */}
          {selectedTab === "Build History" && <TechnicianBuildHistory />}
        </main>
      </div>
    </div>
  );
};

export default TechnicianHome;
