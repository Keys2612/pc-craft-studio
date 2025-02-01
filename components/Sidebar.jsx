"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = ({ setCategory, setSelectedBuild }) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(
    pathname === "/home" ? "All" : "Build Summary"
  );

  const handleCategoryClick = (category) => {
    if (setCategory) setCategory(category);
    setActiveItem(category);
  };

  const handleBuildClick = (buildSection) => {
    if (setSelectedBuild) setSelectedBuild(buildSection);
    setActiveItem(buildSection);
  };

  const getSidebarContent = () => {
    if (pathname === "/home") {
      return (
        <ul className="space-y-3">
          <li className="font-bold">Categories</li>
          {["All", "Storage", "Graphics Cards", "Processors", "Memory"].map((category) => (
            <li
              key={category}
              className={`cursor-pointer px-3 py-2 rounded-lg ${
                activeItem === category ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      );
    }

    if (pathname === "/my-builds") {
      return (
        <ul className="space-y-3">
          <li className="font-bold">My Builds</li>
          {["Build Summary", "Current Orders", "Order History"].map((build) => (
            <li
              key={build}
              className={`cursor-pointer px-3 py-2 rounded-lg ${
                activeItem === build ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleBuildClick(build)}
            >
              {build}
            </li>
          ))}
        </ul>
      );
    }

    return <p className="font-bold">Other Page Content</p>;
  };

  return (
    <aside className="w-1/4 p-4 bg-gray-100 h-screen">
      {getSidebarContent()}
    </aside>
  );
};

export default Sidebar;
