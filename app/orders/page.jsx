"use client";
import { useState, useEffect } from "react";
import OrdersSection from "@/components/OrdersSection"; // Extracted component
import OrderLogHistorySection from "@/components/OrderLogHistorySection"; // Extracted component

const OrdersPage = () => {

  const dummyOrders = [
    { id: "ORD1234", customer: "John Doe", total: "$999", date: "2025-02-01", status: "Pending", items: [{ name: "RTX 3080", quantity: 1, price: "$699" }, { name: "Intel i9-13900K", quantity: 1, price: "$300" }] },
    { id: "ORD1235", customer: "Jane Smith", total: "$1299", date: "2025-02-02", status: "Completed", items: [{ name: "Ryzen 9 5900X", quantity: 1, price: "$499" }, { name: "Corsair RAM 32GB", quantity: 2, price: "$400" }] },
    { id: "ORD1236", customer: "Mike Johnson", total: "$699", date: "2025-02-03", status: "Canceled", items: [{ name: "GTX 1660 Ti", quantity: 1, price: "$299" }] },
  ];
  
  const [selectedTab, setSelectedTab] = useState("All Orders");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Simulating API call
    setOrders(dummyOrders);
    setFilteredOrders(dummyOrders);
  }, []);

  useEffect(() => {
    let updatedOrders = orders;

    // Filter orders by status
    if (filterStatus !== "All") {
      updatedOrders = orders.filter(order => order.status === filterStatus);
    }

    // Search orders by ID or customer name
    if (searchQuery) {
      updatedOrders = updatedOrders.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(updatedOrders);
  }, [searchQuery, filterStatus, orders]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Order Management</h2>
          <ul className="space-y-4">
            {["All Orders", "Order Log and History"].map((item) => (
              <li
                key={item}
                className={`cursor-pointer px-3 py-2 rounded-lg ${
                  selectedTab === item ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
                onClick={() => setSelectedTab(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {/* Additional sidebar content, if needed */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-white">
        {selectedTab === "All Orders" && <OrdersSection />}
        {selectedTab === "Order Log and History" && <OrderLogHistorySection />}
      </div>
    </div>
  );
};

export default OrdersPage;
