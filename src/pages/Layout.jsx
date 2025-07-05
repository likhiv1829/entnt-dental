
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/NavBar.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function Layout({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null; 

  if (currentUser.role === 'Patient') {
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
        <div className="p-4">
          {children}
        </div>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
