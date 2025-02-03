import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, orderId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold mb-4">Confirm Cancellation</h3>
        <p>Are you sure you want to cancel this order?</p>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => onConfirm(orderId)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Yes, Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            No, Keep Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
