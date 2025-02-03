"use client";
import { useState, useEffect } from "react";
import { useParts } from "@/context/PartsContext"; // Import context

const TechnicianCurrentBuild = () => {
  const { currentBuild, moveToBuildHistory } = useParts(); // Access context values
  const [selectedStatus, setSelectedStatus] = useState("In Progress"); // Track the selected status

  useEffect(() => {
    if (currentBuild) {
      setSelectedStatus(currentBuild.status); // Set status of current build
    }
  }, [currentBuild]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdate = () => {
    if (selectedStatus === "Completed" && currentBuild) {
      moveToBuildHistory(currentBuild.id); // Move to build history when completed
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Current Build</h2>

      {currentBuild ? (
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-sm">
          <p className="text-gray-700 font-medium">Order #{currentBuild.id}</p>

          {/* Status Dropdown */}
          <select
            className="bg-gray-200 text-gray-700 rounded-md px-3 py-1"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Update Button */}
          <button
            className="bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700"
            onClick={handleUpdate} // Move to Build History on completion
          >
            Update
          </button>
        </div>
      ) : (
        <p>No current build available.</p>
      )}
    </div>
  );
};

export default TechnicianCurrentBuild;
