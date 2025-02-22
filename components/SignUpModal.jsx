// File: app/components/SignUpModal.jsx
"use client";
import { useState } from "react";

export default function SignUpModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Basic regex patterns (optional, can be improved)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit numeric only

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 1) Check all fields are filled
    if (!username || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // 2) Check email format
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    // 3) Check phone format
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be 10 digits (numbers only).");
      return;
    }

    // 4) Check password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // 5) Check password length (optional rule)
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phone, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Sign up failed");
      }
      
      // Show success message and close the modal after a short delay
      setSuccess("Sign up successful!");
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>

      {/* Error or Success Messages */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-md font-medium text-gray-700">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 
                       rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
                       focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 
                       rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
                       focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700">Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 
                       rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
                       focus:border-indigo-500"
            placeholder="10 digits (e.g. 1234567890)"
          />
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 
                       rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
                       focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 
                       rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
                       focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-md text-gray-700 border border-gray-300 
                       hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 rounded-md text-white bg-indigo-600 
                       hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
