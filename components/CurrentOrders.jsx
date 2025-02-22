// File: app/components/CurrentOrders.jsx
"use client";
import { useState, useEffect } from "react";

const CurrentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from the backend when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelClick = (orderId) => {
    setSelectedOrder(orderId);
    setShowModal(true);
  };

  const confirmCancel = async () => {
    if (selectedOrder) {
      try {
        // Send DELETE request to remove the order from the DB
        const res = await fetch(`http://localhost:5000/api/orders/${selectedOrder}/cancel`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error("Failed to delete order");
        }

        // Re-fetch orders to remove it from the list
        fetchOrders();
      } catch (err) {
        setError(err.message);
      }

      setShowModal(false);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Parts</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4">#{order.id}</td>
                <td className="p-4">
                  {/* If using single-table JSON approach, show the items */}
                  {Array.isArray(order.order_items)
                    ? order.order_items.map((item, idx) => (
                        <div key={idx}>
                          {item.name} x {item.quantity || 1}
                        </div>
                      ))
                    : "No parts"}
                </td>
                <td className="p-4 font-semibold">
                  {order.status}
                </td>
                <td className="p-4">
                  {/* Show "Cancel" if order is pending, or whatever logic you prefer */}
                  <button
                    onClick={() => handleCancelClick(order.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this order?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentOrders;
