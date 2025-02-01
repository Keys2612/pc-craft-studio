// import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import PartCard from "./PartCard";

// const CustomerHome = () => {
//   const [parts, setParts] = useState([]);
//   const [filteredParts, setFilteredParts] = useState([]);
//   const [category, setCategory] = useState("All");
//   const [search, setSearch] = useState("");


//   useEffect(() => {
//     let filtered = parts.filter((part) =>
//       (category === "All" || part.category === category) &&
//       part.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredParts(filtered);
//   }, [category, search, parts]);

//   return (
//     <div className="flex">
//       <Sidebar setCategory={setCategory} />
//       <div className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Parts List</h2>
//           <input 
//             type="text" 
//             placeholder="Search" 
//             className="border rounded px-3 py-2" 
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <div className="grid grid-cols-3 gap-4">
//           {filteredParts.map((part) => (
//             <PartCard key={part.id} part={part} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerHome;
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

  useEffect(() => {
    // Dummy parts data (replace with API fetch if needed)
    const partsData = [
      { id: 1, name: "Samsung 970 EVO 1TB", price: 149.99, category: "Storage", imageUrl: "/images/images.jpeg" },
      { id: 2, name: "NVIDIA RTX 3080", price: 699.99, category: "Graphics Cards", imageUrl: "/images/download.jpeg" },
      { id: 3, name: "Intel Core i9", price: 499.99, category: "Processors", imageUrl: "/images/download (1).jpeg" },
      { id: 4, name: "Corsair Vengeance 16GB", price: 89.99, category: "Memory", imageUrl: "/images/download.jpeg" },
      { id: 5, name: "Samsung 970 EVO 2TB", price: 249.99, category: "Storage", imageUrl: "/images/download.jpeg" },
      { id: 6, name: "Samsung 970 EVO 500GB", price: 109.99, category: "Storage", imageUrl: "/images/download.jpeg" },
    ];

    setParts(partsData);
    setFilteredParts(partsData);
  }, []);

  useEffect(() => {
    let filtered = parts.filter((part) =>
      (category === "All" || part.category === category) &&
      part.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredParts(filtered);
  }, [category, search, parts]);

  return (
    <div className="flex">
      <Sidebar setCategory={setCategory} /> {/* Pass setCategory to Sidebar */}
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


