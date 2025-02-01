// "use client"

// import { useState } from 'react';

// export default function Home() {
//   const [parts, setParts] = useState([
//     { id: 1, name: 'NVIDIA 1068 GDDR6X_PCI', price: 699.99 },
//     { id: 2, name: 'CPU: Intel Core 8 Cores, 16', price: 329.99 },
//   ]);

//   const deletePart = (id) => {
//     setParts(parts.filter((part) => part.id !== id));
//   };

//   const partsTotal = parts.reduce((sum, part) => sum + part.price, 0);
//   const customBuildFee = 20.0;
//   const total = partsTotal + customBuildFee;

//   return (
//     <div>
//       <Header />
//       <main>
//         <h1>Build Parts</h1>
//         <div>
//           {parts.map((part) => (
//             <div key={part.id}>
//               <span>{part.name} - ${part.price}</span>
//               <button onClick={() => deletePart(part.id)}>Delete</button>
//             </div>
//           ))}
//         </div>

//         <h2>Summary</h2>
//         <div>
//           <p>Parts Total: ${partsTotal.toFixed(2)}</p>
//           <p>Custom Build Fee: ${customBuildFee.toFixed(2)}</p>
//           <p>Total: ${total.toFixed(2)}</p>
//         </div>

//         <button>Proceed to Checkout</button>
//       </main>
//       <Footer />
//     </div>
//   );
// }


// "use client";

// // import { redirect } from 'next/navigation';

// // export default function HomePage() {
// //   redirect('/login');
// // }
// import { useState, useEffect } from "react";
// import Sidebar from "../../components/Sidebar";
// import PartCard from "../../components/PartCard";



// export default function HomePage() {
//   const [parts, setParts] = useState([]);
//   const [filteredParts, setFilteredParts] = useState([]);
//   const [category, setCategory] = useState("All");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     // Dummy parts data
//     const partsData = [
//       { id: 1, name: "Samsung 970 EVO 1TB", price: 149.99, category: "Storage", imageUrl: "/samsung-970-evo-1tb.jpg" },
//       { id: 2, name: "NVIDIA RTX 3080", price: 699.99, category: "Graphics Cards", imageUrl: "/rtx-3080.jpg" },
//       { id: 3, name: "Intel Core i9", price: 499.99, category: "Processors", imageUrl: "/intel-core-i9.jpg" },
//       { id: 4, name: "Corsair Vengeance 16GB", price: 89.99, category: "Memory", imageUrl: "/corsair-vengeance-16gb.jpg" },
//       { id: 5, name: "Samsung 970 EVO 2TB", price: 249.99, category: "Storage", imageUrl: "/samsung-970-evo-2tb.jpg" },
//       { id: 6, name: "Samsung 970 EVO 500GB", price: 109.99, category: "Storage", imageUrl: "/samsung-970-evo-500gb.jpg" },
//     ];

//     setParts(partsData);
//     setFilteredParts(partsData);
//   }, []);

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
// }


"use client";
import { useState, useEffect } from "react";
import CustomerHome from "../../components/CustomerHome";
import TechnicianHome from "../../components/TechnicianHome";
import AdminHome from "../../components/AdminHome";

export default function HomePage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Simulating role retrieval (Replace this with actual authentication logic)
    const userRole = localStorage.getItem("userRole") || "customer"; 
    setRole(userRole);
  }, []);

  if (!role) return <div>Loading...</div>;

  return (
    <div>
      {role === "customer" && <CustomerHome />}
      {role === "technician" && <TechnicianHome />}
      {role === "admin" && <AdminHome />}
    </div>
  );
}
