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
    // Sidebar visible on md+ screens
    <div className="hidden md:flex flex-col w-60 bg-gray-800 flex-shrink-0 p-4 min-h-screen">
      <nav className="space-y-2 text-left">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/036/470/606/non_2x/cute-tooth-girl-character-in-cartoon-style-dental-personage-illustration-illustration-for-children-dentistry-happy-tooth-icon-vector.jpg"
            alt="Logo"
            className="w-10 h-10 border-2 border-blue-400 shadow-md"
          />
          <h1 className="font-bold text-lg text-gray-100">ENTNT Dentals</h1>
        </div>

        <Link to="/" className="block p-2 rounded text-gray-200 hover:bg-gray-700 text-sm">
          📊 Dashboard
        </Link>
        <Link to="/patients" className="block p-2 rounded text-gray-200 hover:bg-gray-700 text-sm">
          👥 Patients
        </Link>
        <Link to="/incidents" className="block p-2 rounded text-gray-200 hover:bg-gray-700 text-sm">
          📝 Incidents
        </Link>
        <Link to="/calendar" className="block p-2 rounded text-gray-200 hover:bg-gray-700 text-sm">
          📅 Calendar
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left p-2 rounded text-gray-200 hover:bg-gray-700 text-sm"
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
}
