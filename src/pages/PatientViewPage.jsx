import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loadIncidents } from '../utils/localStorageHelpers';
import { useNavigate } from 'react-router-dom';

export default function PatientViewPage() {
  const { currentUser, logout } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const all = loadIncidents();
    const filtered = all.filter(i => i.patientId === currentUser.patientId);
    setIncidents(filtered);
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const upcomingCount = incidents.filter(i => new Date(i.appointmentDate) > new Date()).length;
  const completedCount = incidents.filter(i => new Date(i.appointmentDate) <= new Date()).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      
      
      <div className="flex justify-between items-center p-4 bg-gray-800/80 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/036/470/606/non_2x/cute-tooth-girl-character-in-cartoon-style-dental-personage-illustration-illustration-for-children-dentistry-happy-tooth-icon-vector.jpg"
            alt="Logo"
            className="w-12 h-12 border-4 border-blue-400 shadow mb-1 rounded-full"
          />
          <h1 className="font-bold text-xl text-blue-400">ENTNT Dental</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 shadow transition"
        >
          Logout
        </button>
      </div>

      
      <div className="flex flex-col items-center mt-8 mb-6">
        <img
          src="https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg"
          alt="Patient"
          className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg mb-2"
        />
        <h2 className="text-2xl font-bold text-blue-300">Welcome, {currentUser.name}!</h2>
        <p className="text-gray-400">Patient ID: {currentUser.patientId}</p>
        <span className="text-sm text-yellow-400 italic mt-1">"Your smile is our priority!"</span>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-6 px-4">
        <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-4 shadow hover:shadow-xl hover:ring-2 hover:ring-green-400/50 transition text-center">
          <p className="text-lg font-semibold text-green-400">Total Visits</p>
          <p className="text-3xl font-bold">{incidents.length}</p>
        </div>
        <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-4 shadow hover:shadow-xl hover:ring-2 hover:ring-yellow-400/50 transition text-center">
          <p className="text-lg font-semibold text-yellow-300">Upcoming</p>
          <p className="text-3xl font-bold">{upcomingCount}</p>
        </div>
        <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-4 shadow hover:shadow-xl hover:ring-2 hover:ring-purple-400/50 transition text-center">
          <p className="text-lg font-semibold text-purple-300">Completed</p>
          <p className="text-3xl font-bold">{completedCount}</p>
        </div>
      </div>

      
      <div className="max-w-5xl mx-auto mb-6 px-4">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-4 shadow flex items-center gap-4 hover:shadow-xl transition">
          <img
            src="https://cdn.polyspeak.ai/speakmaster/9c51c2bf8c4f5ba5caca345248cbf690.webp"
            alt="Doctor"
            className="w-16 h-16 rounded-full border-2 border-purple-400 shadow"
          />
          <div>
            <h3 className="text-lg font-semibold text-purple-300">Dr. Kim Taehyung</h3>
            <p className="text-gray-400">Senior Dental Surgeon</p>
          </div>
          <div className="ml-auto text-yellow-300 text-xs italic">"Your Local Smile Specialist"</div>
        </div>
      </div>

      
      <div className="max-w-5xl mx-auto space-y-4 px-4 pb-6">
        {incidents.length === 0 ? (
          <p className="text-center text-gray-400 italic">No records found in your history.</p>
        ) : (
          incidents.map(i => (
            <div key={i.id} className="bg-gray-700/60 backdrop-blur-md rounded-xl p-4 shadow hover:shadow-xl hover:ring-2 hover:ring-blue-400/40 transition">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-400">{i.title}</h3>
                <span className="text-sm text-gray-400">
                  {new Date(i.appointmentDate).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300">{i.description || i.treatment || 'No description available.'}</p>
              <p className="mt-2 text-purple-300 font-medium">💰 Cost: ₹{i.cost || 'N/A'}</p>

              {i.attachments && i.attachments.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold text-yellow-300">📎 Attachments:</p>
                  <ul className="list-disc list-inside text-blue-200">
                    {i.attachments.map((file, idx) => (
                      <li key={idx}>
                        <a
                          href={file.url || file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {file.name || file.split('/').pop()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
