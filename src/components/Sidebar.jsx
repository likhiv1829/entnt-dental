import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); 

  const handleLogout = () => {
    logout();             
    navigate('/login');     
  };

  return (
    <div className="w-64 bg-gray-800 flex-shrink-0 p-4 min-h-screen">
      <nav className="space-y-2 text-left" >
      <div className="flex items-center gap-1">
      <img
            src="https://static.vecteezy.com/system/resources/previews/036/470/606/non_2x/cute-tooth-girl-character-in-cartoon-style-dental-personage-illustration-illustration-for-children-dentistry-happy-tooth-icon-vector.jpg"
            alt="Logo"
            className="w-12 h-12 border-4 border-blue-400 shadow-lg mb-2"
          />
        <h1 className="font-bold text-xl">ENTNT Dentals</h1>
      </div>
        <Link to="/" className="block p-2 rounded hover:bg-gray-700">📊 Dashboard</Link>
        <Link to="/patients" className="block p-2 rounded hover:bg-gray-700">👥 Patients</Link>
        <Link to="/incidents" className="block p-2 rounded hover:bg-gray-700">📝 Incidents</Link>
        <Link to="/calendar" className="block p-2 rounded hover:bg-gray-700">📅 Calendar</Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left p-2 rounded hover:bg-gray-700"
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
}
