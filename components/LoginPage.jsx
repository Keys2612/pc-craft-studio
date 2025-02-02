"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignUpModal from "@/components/SignUpModal";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!username || !password) {
      setError("Please enter a username and password.");
      return;
    }

    let role = "";
    if (username.startsWith("customer")) role = "customer";
    else if (username.startsWith("tech")) role = "technician";
    else if (username.startsWith("admin")) role = "admin";
    else {
      setError("Invalid username or password.");
      return;
    }

    localStorage.setItem("userRole", role);
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-6xl">🛠️🔧</div>
          <h1 className="text-3xl font-bold text-gray-800 mt-3">PC Craft Studio</h1>
        </div>

        {error && <p className="text-red-500 text-center text-lg mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-lg rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </div>
        </form>

        {/* Sign-Up Button */}
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">Don't have an account?</p>
          <button
            onClick={() => setIsSignUpOpen(true)}
            className="text-indigo-600 text-lg hover:underline font-medium"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Sign-Up Modal */}
      {isSignUpOpen && <SignUpModal onClose={() => setIsSignUpOpen(false)} />}
    </div>
  );
}