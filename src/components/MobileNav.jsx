import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MobileNav() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-gray-800 border-t border-gray-700 py-2 md:hidden z-50">
      <Link to="/" className="text-gray-200 hover:text-blue-400 text-xs flex flex-col items-center">
        📊 <span>Dashboard</span>
      </Link>
      {currentUser.role === 'Admin' && (
        <>
          <Link to="/patients" className="text-gray-200 hover:text-blue-400 text-xs flex flex-col items-center">
            👥 <span>Patients</span>
          </Link>
          <Link to="/incidents" className="text-gray-200 hover:text-blue-400 text-xs flex flex-col items-center">
            📝 <span>Incidents</span>
          </Link>
        </>
      )}
      <Link to="/calendar" className="text-gray-200 hover:text-blue-400 text-xs flex flex-col items-center">
        📅 <span>Calendar</span>
      </Link>
      <button
        onClick={handleLogout}
        className="text-gray-200 hover:text-red-400 text-xs flex flex-col items-center"
      >
        🚪 <span>Logout</span>
      </button>
    </div>
  );
}
