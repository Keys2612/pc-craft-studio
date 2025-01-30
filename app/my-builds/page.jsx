// app/my-builds/page.jsx
"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";

const MyBuilds = () => {
  const [role, setRole] = useState("customer"); // Change to "technician" to test

  // Sample build parts (Customer)
  const buildParts = [
    { name: "NVIDIA 10GB GDDR6X", price: "$699.99", image: "/gpu.jpg" },
    { name: "CPU: Intel Core", price: "$529.99", image: "/cpu.jpg" },
  ];

  // Sample orders (Technician)
  const orders = [
    { id: "12345", parts: "CPU, Motherboard, RAM", status: "Complete" },
    { id: "12346", parts: "Graphics Card, PSU", status: "In Progress" },
    { id: "12347", parts: "SSD, Cooling Fan", status: "Pending" },
    { id: "12348", parts: "SSD, Cooling Fan", status: "Rejected" },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {role === "customer" ? (
            <>
              <h1 className="text-2xl font-bold mb-4">Build Parts</h1>
              <div className="space-y-4">
                {buildParts.map((part, index) => (
                  <div key={index} className="flex items-center border p-4 rounded-lg shadow-md">
                    <img src={part.image} alt={part.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div className="flex-1">
                      <h2 className="font-semibold">{part.name}</h2>
                      <p className="text-gray-600">{part.price}</p>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className="mt-6 p-4 border rounded-lg shadow-md w-1/3">
                <h2 className="font-bold">Summary</h2>
                <p>Parts Total: <span className="font-semibold">$1229.9</span></p>
                <p>Custom Build Fee: <span className="font-semibold">$20.0</span></p>
                <hr className="my-2" />
                <p className="text-lg font-bold">Total: <span>$1249.9</span></p>
                <button className="bg-green-500 text-white w-full py-2 mt-2 rounded">Proceed to Checkout</button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Current Orders</h1>
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Order</th>
                    <th className="p-2 border">Parts</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="text-center border">
                      <td className="p-2 border">#{order.id}</td>
                      <td className="p-2 border">{order.parts}</td>
                      <td className="p-2 border">
                        <span className={
                          order.status === "Complete" ? "text-green-500" :
                          order.status === "In Progress" ? "text-yellow-500" :
                          order.status === "Pending" ? "text-orange-500" :
                          "text-red-500"
                        }>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-2 border">
                        {order.status === "Pending" ? (
                          <button className="bg-red-500 text-white px-4 py-1 rounded">Cancel</button>
                        ) : (
                          <button className="bg-purple-500 text-white px-4 py-1 rounded">View</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </main>
      </div>
      <footer className="text-center py-4 text-gray-500">
        © 2024 PC Craft Studio. All rights reserved.
      </footer>
    </div>
  );
};

export default MyBuilds;
