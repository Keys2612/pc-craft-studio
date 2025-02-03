"use client";
import { useState } from "react";

const OrderLogHistorySection = () => {
  const dummyOrders = [
    { id: "ORD1234", customer: "John Doe", total: "$999", date: "2025-02-01", status: "Pending", items: [{ name: "RTX 3080", quantity: 1, price: "$699" }, { name: "Intel i9-13900K", quantity: 1, price: "$300" }] },
    { id: "ORD1235", customer: "Jane Smith", total: "$1299", date: "2025-02-02", status: "Completed", items: [{ name: "Ryzen 9 5900X", quantity: 1, price: "$499" }, { name: "Corsair RAM 32GB", quantity: 2, price: "$400" }] },
    { id: "ORD1236", customer: "Mike Johnson", total: "$699", date: "2025-02-03", status: "Canceled", items: [{ name: "GTX 1660 Ti", quantity: 1, price: "$299" }] },
  ];

  const [orders, setOrders] = useState(dummyOrders);
  const [filteredOrders, setFilteredOrders] = useState(dummyOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter orders by search query and status
  const filterOrders = () => {
    let updatedOrders = orders;

    if (filterStatus !== "All") {
      updatedOrders = orders.filter(order => order.status === filterStatus);
    }

    if (searchQuery) {
      updatedOrders = updatedOrders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(updatedOrders);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Order Log and History</h1>

      {/* Search & Filter Section */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          className="border p-2 rounded w-1/3"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            filterOrders(); // Call filter on input change
          }}
        />
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            filterOrders(); // Call filter on status change
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Total Price</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">{order.total}</td>
                  <td className="p-2">{order.date}</td>
                  <td
                    className={`p-2 font-semibold ${
                      order.status === "Pending"
                        ? "text-orange-500"
                        : order.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => alert(`Viewing details for ${order.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderLogHistorySection;
