"use client";
import { useState, useEffect } from "react";

const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Customer",
    status: "Inactive",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Technician",
    status: "Active",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Customer",
    status: "Active",
  });

  useEffect(() => {
    setUsers(dummyUsers);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      (roleFilter === "All" || user.role === roleFilter) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    const newUserData = {
      id: users.length + 1,
      ...newUser,
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    };
    setUsers([...users, newUserData]);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Users Management</h1>

      {/* Search & Filter */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border p-2 rounded"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select className="border p-2 rounded" value={roleFilter} onChange={handleRoleFilter}>
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Customer">Customer</option>
          <option value="Technician">Technician</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Profile</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-2">
                  <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
                </td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.status}</td>
                <td className="p-2 space-x-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New User</h2>
            <div className="mb-2">
              <label className="block font-medium">Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium">Role</label>
              <select
                className="w-full border p-2 rounded"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Customer">Customer</option>
                <option value="Technician">Technician</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block font-medium">Status</label>
              <select
                className="w-full border p-2 rounded"
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddUser}>
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;