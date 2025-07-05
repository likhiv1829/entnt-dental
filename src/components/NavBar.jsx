import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const doctorName = currentUser?.email?.split('@')[0] || 'Doctor';

  if (currentUser.role !== 'Admin') return null; 

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 shadow-md text-gray-100">
      <div className="flex items-center gap-3">
      
        <h1 className="font-bold text-l">Beyond Dentistry, We Craft Smiles.</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold">Dr. {doctorName.charAt(0).toUpperCase() + doctorName.slice(1)}</p>
          <p className="text-xs text-gray-400">Practical Dentist</p>
        </div>
        <img 
          src="https://i.pinimg.com/originals/88/19/0e/88190ed76e8febd665a7f72029a90556.jpg" 
          alt="Profile" 
          className="w-10 h-10 rounded-full border-2 border-blue-400" 
        />
      </div>
    </div>
  );
}
