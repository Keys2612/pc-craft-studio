// File: app/my-builds/checkout/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParts } from "@/context/PartsContext";

export default function Checkout() {
  const { selectedParts } = useParts(); // We only need selectedParts from context
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // If there are no parts, redirect back to the builds page
  useEffect(() => {
    if (selectedParts.length === 0) {
      router.push("/my-builds");
    }
  }, [selectedParts, router]);

  if (selectedParts.length === 0) return null;

  // Calculate totals
  const partsTotal = selectedParts.reduce((sum, part) => sum + part.price, 0);
  const customBuildFee = 20;
  const totalPrice = partsTotal + customBuildFee;

  // Confirm order by POSTing to your backend
  const handleConfirmOrder = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Build the data you want to send
      const orderData = {
        parts: selectedParts,
        partsTotal,
        customBuildFee,
        grandTotal: totalPrice,
      };

      // POST to your backend route
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      // Show confirmation message (including order id if available)
      setSuccess(`Order #${data.order.id} confirmed! Redirecting...`);

      // Redirect after a short delay (2 seconds) to the My Builds page, with tab query parameter
      setTimeout(() => {
        router.push("/my-builds?tab=current-orders");
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred while creating the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="font-bold text-xl mb-3">Order Summary</h3>

        {/* Show any errors or success messages */}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

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
          <p>
            Parts Total: <strong>${partsTotal.toFixed(2)}</strong>
          </p>
          <p>
            Custom Build Fee: <strong>${customBuildFee.toFixed(2)}</strong>
          </p>
          <h3 className="font-bold text-xl mt-2">
            Total: ${totalPrice.toFixed(2)}
          </h3>
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={loading}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-bold text-lg"
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
