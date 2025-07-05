import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();    

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (login(email, password)) {
      const savedUser = JSON.parse(localStorage.getItem('currentUser'));
      if (savedUser.role === 'Admin') {
        navigate('/');  
      } else if (savedUser.role === 'Patient') {
        navigate('/my'); 
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="relative p-6 sm:p-8 rounded-xl bg-gray-800 shadow-lg backdrop-blur-md border border-gray-700 w-72 sm:w-80 hover:shadow-xl transition duration-300"
      >
        {/* Glow background effect */}
        <div className="absolute -inset-0.5 rounded-xl blur opacity-30 bg-gradient-to-r from-blue-500 to-purple-500 pointer-events-none"></div>

        <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold text-center text-blue-400">Dental Center Login</h2>
        
        <input 
          className="mb-3 sm:mb-4 w-full p-2.5 sm:p-3 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          className="mb-3 sm:mb-4 w-full p-2.5 sm:p-3 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />

        {error && <div className="mb-3 sm:mb-4 text-red-500 text-center text-sm">{error}</div>}

        <button 
          className="w-full py-2.5 sm:py-3 rounded bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition text-white font-semibold shadow-md hover:shadow-blue-500/40"
        >
          Login
        </button>
      </form>
    </div>
  );
}
