// File: app/Profile.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch current user profile on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        return res.json();
      })
      .then((data) => {
        // Set only the fields we need (exclude role)
        setUser({
          username: data.username,
          email: data.email,
          phone: data.phone,
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile");
      });
  }, [router]);

  // Handle changes to user fields
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Update profile via PUT /api/users/me
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const token = localStorage.getItem("token");

    // Prepare payload; include password only if provided.
    const payload = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      ...(password && { password }),
    };

    fetch("http://localhost:5000/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update profile");
        }
        return res.json();
      })
      .then((data) => {
        setMessage("Profile updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update profile");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-semibold">Phone</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-semibold">New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 border rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold">
          Update Profile
        </button>
      </form>
    </div>
  );
}
