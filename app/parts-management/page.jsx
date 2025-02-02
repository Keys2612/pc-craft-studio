"use client";
import { useState } from "react";

// Dummy parts data
const initialParts = [
  {
    id: 1,
    name: "NVIDIA RTX 3080",
    category: "Graphics Card",
    stock: 10,
    price: 699,
    image: "https://via.placeholder.com/50", // Placeholder image
  },
  {
    id: 2,
    name: "Intel i9-13900K",
    category: "Processor",
    stock: 5,
    price: 599,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Corsair Vengeance 32GB",
    category: "RAM",
    stock: 15,
    price: 149,
    image: "https://via.placeholder.com/50",
  },
];

// Categories for filtering
const categories = ["All", "Graphics Card", "Processor", "RAM"];

const PartsManagement = () => {
  const [parts, setParts] = useState(initialParts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newPart, setNewPart] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    image: "",
  });

  // Filter parts by category and search query
  const filteredParts = parts.filter(
    (part) =>
      (categoryFilter === "All" || part.category === categoryFilter) &&
      part.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPart({ ...newPart, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding a new part
  const handleAddPart = () => {
    if (!newPart.name || !newPart.category || !newPart.stock || !newPart.price) {
      alert("Please fill all fields!");
      return;
    }

    const newPartData = {
      id: parts.length + 1,
      ...newPart,
    };

    setParts([...parts, newPartData]);
    setShowModal(false);
    setNewPart({ name: "", category: "", stock: "", price: "", image: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Parts Management</h1>

      {/* Filters & Search */}
      <div className="flex items-center gap-4 mb-4">
        {/* Category Filter */}
        <div>
          <label className="mr-2 font-semibold">Filter by Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search parts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-64"
        />
      </div>

      {/* Parts Table */}
      <table className="w-full border-collapse border bg-white shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Stock</th>
            <th className="p-3 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredParts.map((part) => (
            <tr key={part.id} className="text-center border">
              <td className="p-3 border">
                <img src={part.image} alt={part.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="p-3 border">{part.name}</td>
              <td className="p-3 border">{part.category}</td>
              <td className="p-3 border">{part.stock}</td>
              <td className="p-3 border">${part.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Part Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Part
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold mb-6">Add New Part</h2>

            {/* Upload Image Section */}
            <div className="mb-6">
              <label className="block font-semibold text-left">Upload Picture</label>
              <div
                className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-gray-100"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {newPart.image ? (
                  <img src={newPart.image} alt="Preview" className="h-24 w-24 object-cover rounded-lg" />
                ) : (
                  <>
                    <div className="text-gray-500 mb-2">📤</div>
                    <button className="bg-blue-600 text-white px-4 py-1 rounded">Upload</button>
                  </>
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Input Fields */}
            <div className="mb-4 text-left">
              <label className="block font-semibold">Part Name</label>
              <input
                type="text"
                value={newPart.name}
                onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Enter part name"
              />
            </div>

            <div className="mb-4 text-left">
              <label className="block font-semibold">Category</label>
              <select
                value={newPart.category}
                onChange={(e) => setNewPart({ ...newPart, category: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 text-left">
              <label className="block font-semibold">Stock</label>
              <input
                type="number"
                value={newPart.stock}
                onChange={(e) => setNewPart({ ...newPart, stock: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Enter stock quantity"
              />
            </div>

            <div className="mb-4 text-left">
              <label className="block font-semibold">Price</label>
              <input
                type="number"
                value={newPart.price}
                onChange={(e) => setNewPart({ ...newPart, price: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Enter price"
              />
            </div>

            {/* Modal Buttons */}
            <button onClick={handleAddPart} className="w-full bg-green-500 text-white py-2 rounded-lg text-lg">
              Add Part
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartsManagement;
