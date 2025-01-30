// export default function Header() {
//   return (
//     <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold flex items-center">
//         <span className="mr-2">🛠️</span> PC Craft Studio
//       </h1>
//       <nav>
//         <ul className="flex gap-6">
//           <li><a href="#" className="hover:text-purple-600">Home</a></li>
//           <li><a href="#" className="hover:text-purple-600">My Builds</a></li>
//           <li><a href="#" className="hover:text-purple-600">Profile</a></li>
//           <li><button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }


import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">PC Craft Studio</h1>
        <nav className="space-x-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <Link href="/my-builds" className="text-blue-600 hover:text-blue-800">My Builds</Link>
          <Link href="/profile" className="text-blue-600 hover:text-blue-800">Profile</Link>
          <Link href="/logout" className="text-blue-600 hover:text-blue-800">Logout</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;