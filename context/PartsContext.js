"use client";
import { createContext, useContext, useState } from "react";

// Create Context
const PartsContext = createContext();

// Context Provider
export const PartsProvider = ({ children }) => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]); // ✅ Store confirmed orders

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

  // ✅ Confirm Order Function
  const confirmOrder = () => {
    if (selectedParts.length === 0) return;

    const newOrder = {
      id: `#${Math.floor(10000 + Math.random() * 90000)}`, // Random order ID
      parts: selectedParts.map((p) => p.name).join(", "),
      status: "Pending", // Initial status
      action: "Cancel",
    };

    setCurrentOrders((prevOrders) => [newOrder, ...prevOrders]); // Add to orders
    setSelectedParts([]); // ✅ Clear cart after confirming
  };

  return (
    <PartsContext.Provider
      value={{ selectedParts, addPart, updateQuantity, removePart, confirmOrder, currentOrders }}
    >
      {children}
    </PartsContext.Provider>
  );
};

// Custom Hook
export const useParts = () => {
  return useContext(PartsContext);
};