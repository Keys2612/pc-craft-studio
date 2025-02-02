"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router

// Dummy data
const dummyOverview = {
  totalOrders: 120,
  pendingOrders: 5,
  registeredUsers: 50,
  availableParts: 200,
};

const dummyRecentActivity = [
  { id: 1, message: "User JohnDoe registered", timestamp: "2025-02-01 10:00" },
  { id: 2, message: "Order #1234 placed", timestamp: "2025-02-01 09:00" },
  { id: 3, message: "Part 'NVIDIA RTX 3080' added", timestamp: "2025-01-31 16:00" },
];

const AdminHome = () => {
  const [overview, setOverview] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Simulating API calls
    setOverview(dummyOverview);
    setRecentActivity(dummyRecentActivity);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">Total Orders</h3>
          <p className="text-2xl">{overview.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">Pending Orders</h3>
          <p className="text-2xl">{overview.pendingOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">Registered Users</h3>
          <p className="text-2xl">{overview.registeredUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">Available Parts</h3>
          <p className="text-2xl">{overview.availableParts}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <ul>
            {recentActivity.map((activity) => (
              <li key={activity.id} className="mb-2">
                <p>{activity.message}</p>
                <span className="text-gray-500 text-sm">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions (Moved to Bottom) */}
      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => router.push("/parts-management")}
          >
            Manage Parts
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => router.push("/orders")}
          >
            View Orders
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={() => router.push("/users")}
          >
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;