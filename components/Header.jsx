"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "./LogoutModal"; // Import the modal

const Header = () => {
  const [role, setRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    setIsModalOpen(true); // Open the modal when logout is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal if cancel is clicked
  };

  const handleConfirmLogout = () => {
    // Clear session and redirect on confirm
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  const navLinks = {
    customer: [
      { href: "/home", label: "Home" },
      { href: "/my-builds", label: "My Builds" },
      { href: "/profile", label: "Profile" },
    ],
    technician: [
      { href: "/home", label: "Home" },
      { href: "/techprofile", label: "Profile" },
    ],
    admin: [
      { href: "/home", label: "Home" },
      { href: "/parts-management", label: "Parts Management" },
      { href: "/orders", label: "Orders" },
      { href: "/users", label: "Users" },
    ],
  };

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

      {/* Modal Component */}
      <LogoutModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmLogout} 
      />
    </header>
  );
};

export default Header;
