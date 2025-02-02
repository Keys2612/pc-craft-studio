"use client";

import { PartsProvider } from "@/context/PartsContext";
import { usePathname } from "next/navigation";
import "../styles/globals.css"; // Ensure Tailwind is imported
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current page path

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <PartsProvider>
          {/* Show Header only if not on login page */}
          {pathname !== "/" && <Header />}

          {/* Main content */}
          <main className="flex-grow container mx-auto p-4">{children}</main>

          {/* Show Footer only if not on login page */}
          {pathname !== "/" && <Footer />}
        </PartsProvider>
      </body>
    </html>
  );
}
  