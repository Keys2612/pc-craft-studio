// components/Sidebar.jsx
"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [role, setRole] = useState("customer"); // Change this to "technician" to test

  const getSidebarContent = () => {
    if (pathname === "/") {
      return (
        <ul className="space-y-3">
          <li className="font-bold">Categories</li>
          <li className="cursor-pointer hover:underline">All</li>
          <li className="cursor-pointer hover:underline">Storage</li>
          <li className="cursor-pointer hover:underline">Graphics Cards</li>
          <li className="cursor-pointer hover:underline">Processors</li>
          <li className="cursor-pointer hover:underline">Memory</li>
        </ul>
      );
    }

    if (pathname === "/my-builds") {
      return (
        <ul className="space-y-3">
          <li className="font-bold">{role === "technician" ? "Technician Panel" : "My Builds"}</li>
          <li className="cursor-pointer hover:underline">Build Summary</li>
          <li className="cursor-pointer hover:underline">Current Orders</li>
          <li className="cursor-pointer hover:underline">Order History</li>
        </ul>
      );
    }

    return <p className="font-bold">Other Page Content</p>;
  };

  return (
    <aside className="w-1/4 p-4 bg-gray-100 h-screen">
      {getSidebarContent()}
    </aside>
  );
};

export default Sidebar;
  