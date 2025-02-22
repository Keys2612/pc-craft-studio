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
    image: "/images/download.jpeg",
  },
  {
    id: 2,
    name: "Intel i9-13900K",
    category: "Processor",
    stock: 5,
    price: 599,
    image: "/images/download (1).jpeg",
  },
  {
    id: 3,
    name: "Corsair Vengeance 32GB",
    category: "RAM",
    stock: 15,
    price: 149,
    image: "/images/corsair-ram.jpeg",
  },
];

// Categories for filtering
const categories = ["All", "Graphics Card", "Processor", "RAM"];

const PartsManagement = () => {
  const [parts, setParts] = useState(initialParts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPart, setNewPart] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    image: "",
  });
  const [editPart, setEditPart] = useState(null);

  // Handle image upload
  const handleImageUpload = (e, setPart) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPart((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle editing a part
  const handleEditPart = () => {
    setParts(parts.map((p) => (p.id === editPart.id ? editPart : p)));
    setShowEditModal(false);
    setEditPart(null);
  };

  // Handle adding a new part
  const handleAddPart = () => {
    const newId = parts.length + 1;
    setParts([...parts, { ...newPart, id: newId }]);
    setShowModal(false);
    setNewPart({
      name: "",
      category: "",
      stock: "",
      price: "",
      image: "",
    });
  };

  // Filter parts based on category and search query
  const filteredParts = parts.filter((part) => {
    const matchesCategory =
      categoryFilter === "All" || part.category === categoryFilter;
    const matchesSearch =
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Parts Management</h1>

      {/* Filter and Search */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
          placeholder="Search parts..."
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Categories</option>
          {categories.slice(1).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParts.map((part) => (
            <tr key={part.id} className="text-center border">
              <td className="p-3 border">
                <img
                  src={part.image}
                  alt={part.name}
                  className="w-12 h-12 object-cover rounded mx-auto"
                />
              </td>
              <td className="p-3 border">{part.name}</td>
              <td className="p-3 border">{part.category}</td>
              <td className="p-3 border">{part.stock}</td>
              <td className="p-3 border">${part.price}</td>
              <td className="p-3 border">
                <button
                  onClick={() => {
                    setEditPart(part);
                    setShowEditModal(true);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </td>
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

      {/* Add Part Modal */}
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
                onChange={(e) => handleImageUpload(e, setNewPart)}
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
            <div className="flex gap-4">
              <button
                onClick={handleAddPart}
                className="w-full bg-green-500 text-white py-2 rounded-lg text-lg"
              >
                Add Part
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-500 text-white py-2 rounded-lg text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editPart && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold mb-6">Edit Part</h2>

            {/* Upload Image */}
            <div className="mb-4 text-left">
              <label className="block font-semibold">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setEditPart)}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Part Name */}
            <div className="mb-4 text-left">
              <label className="block font-semibold">Part Name</label>
              <input
                type="text"
                value={editPart.name}
                onChange={(e) =>
                  setEditPart({ ...editPart, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter part name"
              />
            </div>

            {/* Category */}
            <div className="mb-4 text-left">
              <label className="block font-semibold">Category</label>
              <select
                value={editPart.category}
                onChange={(e) =>
                  setEditPart({ ...editPart, category: e.target.value })
                }
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

            {/* Stock */}
            <div className="mb-4 text-left">
              <label className="block font-semibold">Stock</label>
              <input
                type="number"
                value={editPart.stock}
                onChange={(e) =>
                  setEditPart({ ...editPart, stock: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter stock quantity"
              />
            </div>

            {/* Price */}
            <div className="mb-4 text-left">
              <label className="block font-semibold">Price</label>
              <input
                type="number"
                value={editPart.price}
                onChange={(e) =>
                  setEditPart({ ...editPart, price: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter price"
              />
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleEditPart}
                className="w-full bg-green-500 text-white py-2 rounded-lg text-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full bg-gray-500 text-white py-2 rounded-lg text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartsManagement;
