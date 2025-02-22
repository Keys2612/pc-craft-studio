// File: app/profile/page.jsx (or wherever your Profile page is)
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  // Local state for user profile fields
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "", // For updating password if needed
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch token from localStorage (assuming you store it on login)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // On component mount, fetch the current user's data
  useEffect(() => {
    if (!token) {
      // If no token, redirect to login or handle accordingly
      router.push("/login");
      return;
    }

    // Fetch user info from backend
    fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }
        return res.json();
      })
      .then((data) => {
        // data should have { username, email, phone, etc. }
        setUser({
          ...user,
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      })
      .catch((err) => {
        setError(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    try {
      // PUT or PATCH to update user info
      const response = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT", // or PATCH, depending on your backend
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          phone: user.phone,
          password: user.password, // Only if user wants to update password
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setMessage("Profile updated successfully!");
      // Optionally clear the password field
      setUser({ ...user, password: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {/* Display success or error messages */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-500 mb-2">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Username */}
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

        {/* Email */}
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

        {/* Phone (optional) */}
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

        {/* New Password */}
        <div className="mb-4">
          <label className="block font-semibold">New Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
