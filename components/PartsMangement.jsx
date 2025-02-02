"use client";
import { useState } from "react";

// Dummy parts data
const initialParts = [
  { id: 1, name: "NVIDIA RTX 3080", category: "GPU", stock: 10, price: 699 },
  { id: 2, name: "Intel i9-12900K", category: "CPU", stock: 5, price: 599 },
  { id: 3, name: "Corsair 32GB RAM", category: "Memory", stock: 15, price: 129 },
];

export default function PartsManagement() {
  const [parts, setParts] = useState(initialParts);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPart, setNewPart] = useState({ name: "", category: "", stock: "", price: "" });

  // Handle adding a new part
  const handleAddPart = (e) => {
    e.preventDefault();
    if (!newPart.name || !newPart.category || !newPart.stock || !newPart.price) return;

    const newPartData = {
      id: parts.length + 1,
      ...newPart,
      stock: Number(newPart.stock),
      price: Number(newPart.price),
    };

    setParts([...parts, newPartData]);
    setNewPart({ name: "", category: "", stock: "", price: "" }); // Reset form
  };

  // Handle deleting a part
  const handleDelete = (id) => {
    setParts(parts.filter((part) => part.id !== id));
  };

  // Handle searching/filtering parts
  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Parts Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search parts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      {/* Parts Table */}
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Price ($)</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParts.map((part) => (
            <tr key={part.id} className="text-center">
              <td className="border border-gray-300 p-2">{part.name}</td>
              <td className="border border-gray-300 p-2">{part.category}</td>
              <td className="border border-gray-300 p-2">{part.stock}</td>
              <td className="border border-gray-300 p-2">${part.price}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDelete(part.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Part Form */}
      <h2 className="text-2xl font-bold mb-4">Add New Part</h2>
      <form onSubmit={handleAddPart} className="grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={newPart.name}
          onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={newPart.category}
          onChange={(e) => setNewPart({ ...newPart, category: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newPart.stock}
          onChange={(e) => setNewPart({ ...newPart, stock: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newPart.price}
          onChange={(e) => setNewPart({ ...newPart, price: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-4"
        >
          Add Part
        </button>
      </form>
    </div>
  );
}