"use client";
import { useState } from "react";
import { useParts } from "@/context/PartsContext";

const CurrentOrders = ({ orders }) => {
  const { cancelOrder } = useParts();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCancelClick = (orderId) => {
    setSelectedOrder(orderId);
    setShowModal(true); // ✅ Show confirmation modal
  };

  const confirmCancel = () => {
    if (selectedOrder) {
      cancelOrder(selectedOrder);
      setShowModal(false);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
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
                <td className="p-4">{order.parts}</td>
                <td className={`p-4 font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </td>
                <td className="p-4">
                  {order.action === "Cancel" ? (
                    <button
                      onClick={() => handleCancelClick(order.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded">
                      {order.action}
                    </button>
                  )}
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
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for status colors
const getStatusColor = (status) => {
  switch (status) {
    case "Complete":
      return "text-green-500";
    case "In Progress":
      return "text-yellow-500";
    case "Pending":
      return "text-orange-500";
    default:
      return "text-red-500";
  }
};

export default CurrentOrders;
