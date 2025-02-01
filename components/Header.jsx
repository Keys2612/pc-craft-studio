"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Simulating user role retrieval (replace with actual auth logic)
    const userRole = localStorage.getItem("userRole"); // Example of retrieving role from storage
    setRole(userRole);
  }, []);

  // Define naviCPU, Motherboard, RAM	gation links based on user role
  const navLinks = {
    customer: [
      { href: "/home", label: "Home" },
      { href: "/my-builds", label: "My Builds" },
      { href: "/profile", label: "Profile" },
      { href: "/logout", label: "Logout" },
    ],
    technician: [
      { href: "/home", label: "Home" },
      { href: "/profile", label: "Profile" },
      { href: "/logout", label: "Logout" },
    ],
    admin: [
      { href: "/home", label: "Home" },
      { href: "/parts-management", label: "Parts Management" },
      { href: "/orders", label: "Orders" },
      { href: "/users", label: "Users" },
      { href: "/settings", label: "Settings" },
      { href: "/logout", label: "Logout" },
    ],
  };

  // If role is not set, return nothing (prevents rendering before user data is fetched)
  if (!role) return null;

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">PC Craft Studio</h1>
        <nav className="space-x-4">
          {navLinks[role]?.map((link) => (
            <Link key={link.href} href={link.href} className="text-blue-600 hover:text-blue-800">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
