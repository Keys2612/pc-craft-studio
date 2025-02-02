"use client";
import { useState } from "react";

const TechnicianHome = () => {
  const [selectedTab, setSelectedTab] = useState("Available Orders");
  const [orders, setOrders] = useState([
    { id: "123", status: "New Build Order" },
    { id: "124", status: "New Build Order" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto flex gap-6">
        {/* Sidebar */}
        <aside className="w-1/4 p-4 bg-gray-100 h-screen">
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

        {/* Main Content */}
        <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{selectedTab}</h2>
          <div className="grid grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-600">
        © 2024 PC Craft Studio. All rights reserved.
      </footer>
    </div>
  );
};

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4">
      <h4 className="font-semibold">{order.status}</h4>
      <p className="text-gray-600">Order #{order.id}</p>
      <div className="mt-3 flex gap-2">
        <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600">Accept</button>
        <button className="bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600">View</button>
      </div>
    </div>
  );
};

export default TechnicianHome;
