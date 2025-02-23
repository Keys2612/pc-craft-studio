// File: app/components/CustomerHome.jsx
"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import PartCard from "./PartCard";
import { useParts } from "@/context/PartsContext"; // Import global state

const CustomerHome = () => {
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { addPart } = useParts(); // Access addPart function from context

  // 1) Fetch parts from your backend on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/parts") 
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch parts");
        }
        return res.json();
      })
      .then((data) => {
        // data should be an array of parts from your DB
        setParts(data);
        setFilteredParts(data);
      })
      .catch((error) => {
        console.error("Error fetching parts:", error);
      });
  }, []);

  // 2) Filter parts whenever category or search changes
  useEffect(() => {
    const filtered = parts.filter((part) =>
      (category === "All" || part.category === category) &&
      part.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredParts(filtered);
  }, [category, search, parts]);

  return (
    <div className="flex">
      <Sidebar setCategory={setCategory} />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Parts List</h2>
          <input
            type="text"
            placeholder="Search"
            className="border rounded px-3 py-2"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredParts.map((part) => (
            <PartCard key={part.id} part={part} onSelect={() => addPart(part)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
