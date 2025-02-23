// File: app/my-builds/current-orders/page.jsx
"use client";
import { useState, useEffect } from "react";

export default function CurrentOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => {
        console.error(err);
        setError("Could not load orders");
      });
  }, []);

  // Color-code the status text
  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "text-green-500";
      case "In Progress":
        return "text-yellow-500";
      case "Pending":
        return "text-orange-500";
      default:
        return "text-red-500"; // e.g., 'Cancelled' or unknown
    }
  };

  // When user clicks "Cancel," store the order ID and show the modal
  const handleCancelClick = (orderId) => {
    setSelectedOrder(orderId);
    setShowModal(true);
  };

  // If user confirms cancellation, call DELETE endpoint
  const confirmCancel = async () => {
    if (!selectedOrder) return;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${selectedOrder}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to cancel order");
      }
      // Remove from local state
      setOrders((prev) => prev.filter((o) => o.id !== selectedOrder));
    } catch (err) {
      console.error(err);
      setError("Could not cancel order");
    } finally {
      // Hide modal and reset selected order
      setShowModal(false);
      setSelectedOrder(null);
    }
  };

  // If user clicks "No," just hide the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Total Cost</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4">#{order.id}</td>
                <td className={`p-4 font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </td>
                <td className="p-4">${order.total_cost.toFixed(2)}</td>
                <td className="p-4">
                  {order.status === "Pending" || order.status === "In Progress" ? (
                    <button
                      onClick={() => handleCancelClick(order.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this order?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
