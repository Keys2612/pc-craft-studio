"use client";
import { useState } from "react";

const OrdersSection = () => {
  const dummyOrders = [
    { id: "ORD123", status: "Pick up" },
    { id: "ORD123", status: "Complete" },
    { id: "ORD123", status: "Complete" },
    { id: "ORD123", status: "Pick up" },
  ];

  const [orders, setOrders] = useState(dummyOrders);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    pickupPerson: "",
    pickupDate: "",
    contact: "",
  });

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
    setFormData({ pickupPerson: "", pickupDate: "", contact: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    closeModal();
  };

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Orders Section */}
      <div className="flex flex-col w-full">
        <h1 className="text-xl font-bold mb-4">All Orders</h1>

        <div className="bg-white p-4 rounded-lg shadow flex-grow">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg mb-2 shadow"
            >
              <span className="text-gray-800 font-medium">
                Order #{order.id}
              </span>

              <select
                className="border p-2 rounded text-gray-700"
                value={order.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
              >
                <option value="Pick up">Pick up</option>
                <option value="Complete">Complete</option>
              </select>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => openModal(order)}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal with Form */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Pickup Details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Pickup Person</label>
                <input
                  type="text"
                  name="pickupPerson"
                  value={formData.pickupPerson}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter pickup person's name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Pickup Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter contact details"
                  required
                />
              </div>

              {/* Confirm and Cancel Buttons */}
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
