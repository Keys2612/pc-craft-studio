"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve user role from localStorage (or replace with real auth logic)
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    // Clear user session (example: remove token and role from localStorage)
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to the login page
    router.push("/");
  };

  // Define navigation links based on user role
  const navLinks = {
    customer: [
      { href: "/home", label: "Home" },
      { href: "/my-builds", label: "My Builds" },
      { href: "/profile", label: "Profile" },
    ],
    technician: [
      { href: "/home", label: "Home" },
      { href: "/profile", label: "Profile" },
    ],
    admin: [
      { href: "/home", label: "Home" },
      { href: "/parts-management", label: "Parts Management" },
      { href: "/orders", label: "Orders" },
      { href: "/users", label: "Users" },
      // { href: "/settings", label: "Settings" },
    ],
  };

  // If role is not set, return nothing (prevents rendering before user data is fetched)
  if (!role) return null;

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">PC Craft Studio</h1>
        <nav className="space-x-4 flex items-center">
          {navLinks[role]?.map((link) => (
            <Link key={link.href} href={link.href} className="text-blue-600 hover:text-blue-800">
              {link.label}
            </Link>
          ))}
          {/* Logout Button */}
          <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-semibold">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;