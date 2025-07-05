import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/NavBar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import MobileNav from '../components/MobileNav.jsx';
export default function Layout({ children }) {
  const { currentUser } = useContext(AuthContext);

  // Show nothing if not logged in
  if (!currentUser) return null;

  // Patient role: simpler layout
  if (currentUser.role === 'Patient') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
        <div className="p-3 sm:p-4">
          {children}
        </div>
      </div>
    );
  }

  // Admin role: Sidebar + Navbar layout
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-3 sm:p-4">
          {children}
        </main>
      </div>
      <MobileNav /> 
    </div>
  );
}
