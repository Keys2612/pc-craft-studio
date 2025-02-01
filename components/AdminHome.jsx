"use client";
import { useState } from "react";

export default function AdminHome() {
  const [search, setSearch] = useState("");
  const [parts, setParts] = useState([
    { id: 1, name: "Ryzen 5 3600", category: "CPU", price: 199.99 },
    { id: 2, name: "GTX 1660 Super", category: "Graphics Card", price: 229.99 },
    { id: 3, name: "Corsair Vengeance LPX", category: "RAM", price: 79.99 },
  ]);

  const handleDelete = (id) => {
    setParts(parts.filter((part) => part.id !== id));
  };

  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Parts</h2>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border px-3 py-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredParts.map((part) => (
              <tr key={part.id} className="border-b">
                <td className="p-3">{part.name}</td>
                <td className="p-3">{part.category}</td>
                <td className="p-3">${part.price.toFixed(2)}</td>
                <td className="p-3 flex gap-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(part.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="text-center text-gray-500 text-sm mt-6">
        © 2024 PC Craft Studio. All rights reserved.
      </footer>
    </div>
  );
}
