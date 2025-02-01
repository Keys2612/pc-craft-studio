"use client";
import { createContext, useContext, useState } from "react";

// Create Context
const PartsContext = createContext();

// Context Provider
export const PartsProvider = ({ children }) => {
  const [selectedParts, setSelectedParts] = useState([]);

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

  return (
    <PartsContext.Provider value={{ selectedParts, addPart, updateQuantity, removePart }}>
      {children}
    </PartsContext.Provider>
  );
};

// Custom Hook
export const useParts = () => {
  return useContext(PartsContext);
};