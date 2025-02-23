// File: app/my-builds/checkout/page.jsx (example)
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParts } from "@/context/PartsContext";

export default function Checkout() {
  const { selectedParts } = useParts();
  const router = useRouter();

  // If no parts, redirect back
  useEffect(() => {
    if (selectedParts.length === 0) {
      router.push("/my-builds");
    }
  }, [selectedParts, router]);

  if (selectedParts.length === 0) return null;

  const partsTotal = selectedParts.reduce((sum, part) => sum + part.price, 0);
  const customBuildFee = 20;
  const totalPrice = partsTotal + customBuildFee;

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parts: selectedParts,
          partsTotal,
          customBuildFee,
          grandTotal: totalPrice,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      // On success, redirect to Current Orders tab
      router.push("/my-builds");
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="font-bold text-xl mb-3">Order Summary</h3>
        {selectedParts.map((part) => (
          <div key={part.id} className="flex items-center justify-between border-b py-3">
            <div className="flex items-center space-x-4">
              <img src={part.imageUrl} alt={part.name} className="w-16 h-16 rounded-lg" />
              <div>
                <p className="font-bold">{part.name}</p>
                <p>${part.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 border-t pt-4">
          <p>Parts Total: <strong>${partsTotal.toFixed(2)}</strong></p>
          <p>Custom Build Fee: <strong>${customBuildFee.toFixed(2)}</strong></p>
          <h3 className="font-bold text-xl mt-2">Total: ${totalPrice.toFixed(2)}</h3>
        </div>
        <button 
          onClick={handleConfirmOrder} 
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-bold text-lg"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
