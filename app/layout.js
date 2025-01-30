// import '../styles/globals.css';

// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }

import "../styles/globals.css"; // Ensure Tailwind is imported
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <html className="flex flex-col min-h-screen">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="flex-grow container mx-auto p-4">{children}</main>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}