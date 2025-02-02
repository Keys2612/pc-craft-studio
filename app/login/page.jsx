

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       alert("Please enter username and password.");
//       return;
//     }

//     // Determine role based on username prefix
//     let role = "";
//     if (username.startsWith("customer")) role = "customer";
//     else if (username.startsWith("tech")) role = "technician";
//     else if (username.startsWith("admin")) role = "admin";
//     else {
//       alert("Invalid username or password.");
//       return;
//     }

//     // Store role in localStorage and redirect to home
//     localStorage.setItem("userRole", role);
//     router.push("/home");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Username:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
