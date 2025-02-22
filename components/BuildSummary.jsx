// File: app/components/BuildSummary.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParts } from "@/context/PartsContext";

const BuildSummary = () => {
  const { selectedParts, updateQuantity, removePart } = useParts();
  const router = useRouter();

  // Calculate totals
  const partsTotal = selectedParts.reduce((sum, part) => sum + part.price * part.quantity, 0);
  const customBuildFee = 20.0;
  const grandTotal = partsTotal + customBuildFee;

  const handleCheckout = () => {
    // Navigate to the confirm checkout page
    router.push("/my-builds/checkout");
  };

  return (
    <div className="flex">
      {/* Parts List */}
      <div className="w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Build Parts</h2>
        {selectedParts.length === 0 ? (
          <p>No parts selected yet.</p>
        ) : (
          selectedParts.map((part, index) => (
            <div key={index} className="flex items-center border p-4 mb-4 rounded-lg shadow">
              <img
                src={part.imageUrl}
                alt={part.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-bold">{part.name}</h3>
                <p>${part.price.toFixed(2)}</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(part.id, part.quantity - 1)}
                    className="bg-gray-300 px-2 py-1 rounded"
                    disabled={part.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{part.quantity}</span>
                  <button
                    onClick={() => updateQuantity(part.id, part.quantity + 1)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removePart(part.id)}
                className="ml-auto bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary Section */}
      <div className="w-1/3 p-4 bg-white shadow rounded-lg">
        <h3 className="font-bold text-xl">Summary</h3>
        <p>Parts Total: ${partsTotal.toFixed(2)}</p>
        <p>Custom Build Fee: ${customBuildFee.toFixed(2)}</p>
        <h3 className="font-bold text-lg">
          Total: ${grandTotal.toFixed(2)}
        </h3>

        <button
          onClick={handleCheckout}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default BuildSummary;
