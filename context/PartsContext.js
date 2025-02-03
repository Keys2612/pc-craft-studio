"use client";
import { createContext, useContext, useState } from "react";

// Create Context
const PartsContext = createContext();

// Context Provider
export const PartsProvider = ({ children }) => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]); // Orders from customer confirmed but not yet accepted by technician
  const [currentBuild, setCurrentBuild] = useState(null); // Technician's accepted order
  const [buildHistory, setBuildHistory] = useState([]); // Orders in "Build History" section

  const addPart = (part) => {
    setSelectedParts((prevParts) => {
      const existingPart = prevParts.find((p) => p.id === part.id);
      if (existingPart) {
        return prevParts.map((p) =>
          p.id === part.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevParts, { ...part, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setSelectedParts((prevParts) =>
      prevParts.map((part) =>
        part.id === id ? { ...part, quantity: Math.max(1, newQuantity) } : part
      )
    );
  };

  const removePart = (id) => {
    setSelectedParts((prevParts) => prevParts.filter((part) => part.id !== id));
  };

  // ✅ Cancel Order Function (NEW)
  const cancelOrder = (orderId) => {
    setCurrentOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  // ✅ Confirm Order Function (Customer places an order)
  const confirmOrder = () => {
    if (selectedParts.length === 0) return;

    const newOrder = {
      id: `#${Math.floor(10000 + Math.random() * 90000)}`, // Random order ID
      parts: selectedParts.map((p) => `${p.name} (x${p.quantity})`).join(", "),
      status: "Pending", // Initially pending
      action: "Cancel",
    };

    setCurrentOrders((prevOrders) => [newOrder, ...prevOrders]); // Add to Available Orders (not yet accepted)
    setSelectedParts([]); // Clear cart after confirming
  };

  // ✅ Accept Order Function (Technician accepts an order)
  const acceptOrder = (orderId) => {
    const orderToAccept = currentOrders.find((order) => order.id === orderId);
    if (!orderToAccept) return;

    setCurrentBuild(orderToAccept); // Move to Current Build
    setCurrentOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId)); // Remove from Available Orders
  };

// ✅ Move Order to Build History after completion
  const moveToBuildHistory = () => {
    if (!currentBuild) return; // Check if there is a current build
  
    // Create a copy of the current build and add a date of completion
    const completedBuild = { ...currentBuild, date: new Date().toLocaleDateString() };

    // Add the completed build to the history
    setBuildHistory((prevHistory) => [...prevHistory, completedBuild]);

    // Reset the current build to null
    setCurrentBuild(null);
  };
  return (
    <PartsContext.Provider
      value={{
        selectedParts,
        addPart,
        updateQuantity,
        removePart,
        confirmOrder,
        cancelOrder,
        acceptOrder, // Provide accept function
        currentOrders, // Orders confirmed by the customer (Available Orders)
        currentBuild, // Provide current build to technician (Accepted orders)
        moveToBuildHistory, // Move completed orders to history
      }}
    >
      {children}
    </PartsContext.Provider>
  );
};

// Custom Hook
export const useParts = () => {
  return useContext(PartsContext);
};
