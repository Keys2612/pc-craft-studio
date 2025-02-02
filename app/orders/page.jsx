"use client";
import { useState, useEffect } from "react";

const dummyOrders = [
  { id: "ORD1234", customer: "John Doe", total: "$999", date: "2025-02-01", status: "Pending", items: [{ name: "RTX 3080", quantity: 1, price: "$699" }, { name: "Intel i9-13900K", quantity: 1, price: "$300" }] },
  { id: "ORD1235", customer: "Jane Smith", total: "$1299", date: "2025-02-02", status: "Completed", items: [{ name: "Ryzen 9 5900X", quantity: 1, price: "$499" }, { name: "Corsair RAM 32GB", quantity: 2, price: "$400" }] },
  { id: "ORD1236", customer: "Mike Johnson", total: "$699", date: "2025-02-03", status: "Canceled", items: [{ name: "GTX 1660 Ti", quantity: 1, price: "$299" }] },
];

const OrdersPage = () => {
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Orders Management</h1>

      {/* Search & Filter */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          className="border p-2 rounded w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
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
                  <td className={`p-2 font-semibold ${order.status === "Pending" ? "text-orange-500" : order.status === "Completed" ? "text-green-500" : "text-red-500"}`}>
                    {order.status}
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => setSelectedOrder(order)}
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Total Price:</strong> {selectedOrder.total}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Status:</strong> <span className={`${selectedOrder.status === "Pending" ? "text-orange-500" : selectedOrder.status === "Completed" ? "text-green-500" : "text-red-500"}`}>{selectedOrder.status}</span></p>

            {/* Order Items */}
            <h3 className="text-xl font-semibold mt-4">Items</h3>
            <ul className="border p-2 rounded">
              {selectedOrder.items.map((item, index) => (
                <li key={index} className="border-b p-2 last:border-0">
                  <p><strong>{item.name}</strong></p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </li>
              ))}
            </ul>

            {/* Close Button */}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
