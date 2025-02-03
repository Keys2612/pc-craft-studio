"use client";
import { useParts } from "@/context/PartsContext";
import TechnicianOrderCard from "./TechnicianOrderCard";

const TechnicianOrders = ({ orders }) => {
  const { acceptOrder } = useParts(); // Access the acceptOrder function from context

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Available Orders for Technician</h2>
      {orders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <TechnicianOrderCard key={order.id} order={order} onAccept={acceptOrder} /> // Pass onAccept as prop
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No orders available.</p>
      )}
    </div>
  );
};

export default TechnicianOrders;
