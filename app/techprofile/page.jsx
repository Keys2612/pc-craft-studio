"use client";
import { useState, useEffect } from "react";

const TechnicianProfile = () => {
  const [technician, setTechnician] = useState({
    name: "Tech Guy",
    email: "techguy@example.com",
    skills: "PC Assembly, Hardware Repair, Troubleshooting",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch technician data from API or localStorage (if needed)
    const storedTech = localStorage.getItem("technicianProfile");
    if (storedTech) {
      setTechnician(JSON.parse(storedTech));
    }
  }, []);

  const handleChange = (e) => {
    setTechnician({ ...technician, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("technicianProfile", JSON.stringify(technician));
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Technician Profile</h2>
      {message && <p className="text-green-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={technician.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={technician.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Skills</label>
          <textarea
            name="skills"
            value={technician.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default TechnicianProfile;
