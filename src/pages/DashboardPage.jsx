import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function safeParse(key, fallback = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error parsing localStorage key "${key}":`, e);
    return fallback;
  }
}

export default function DashboardPage() {
  const { currentUser } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    setPatients(safeParse('patients'));
    setIncidents(safeParse('incidents'));
  }, []);

  const upcomingAppointments = incidents
    .filter(inc => new Date(inc.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 5);

  const pendingCount = incidents.filter(inc => inc.status === 'Pending').length;
  const totalRevenue = incidents
    .filter(inc => inc.status === 'Completed')
    .reduce((sum, inc) => sum + (parseFloat(inc.cost) || 0), 0);

  
  const statusData = [
    { status: 'Pending', count: incidents.filter(inc => inc.status === 'Pending').length },
    { status: 'Completed', count: incidents.filter(inc => inc.status === 'Completed').length },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-4">Dashboard Overview</h1>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:ring hover:ring-blue-500/50 transition">
            <h2 className="font-semibold mb-2 text-blue-400">Patients Today</h2>
            <p className="text-3xl font-bold">{patients.length}</p>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:ring hover:ring-green-500/50 transition">
            <h2 className="font-semibold mb-2 text-green-400">Total Patients</h2>
            <p className="text-3xl font-bold">{patients.length}</p>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:ring hover:ring-yellow-500/50 transition">
            <h2 className="font-semibold mb-2 text-yellow-400">Requests</h2>
            <p className="text-3xl font-bold">{pendingCount}</p>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:ring hover:ring-purple-500/50 transition">
            <h2 className="font-semibold mb-2 text-purple-400">💰 Total Revenue</h2>
            <p className="text-3xl font-bold text-purple-300">₹ {totalRevenue}</p>
          </div>
        </div>

       
        <div className="bg-gray-700 p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2 text-green-300">Incident Status Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statusData}>
              <XAxis dataKey="status" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        
        <div className="bg-gray-700 p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-300">Latest Patients</h2>
          <table className="w-full text-left">
            <thead className="text-gray-400">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">DOB</th>
                <th className="p-2">Contact</th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(-5).reverse().map(p => (
                <tr key={p.id} className="hover:bg-gray-600">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.dob}</td>
                  <td className="p-2">{p.contact}</td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-2 text-center text-gray-400">No patients found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
        <div className="bg-gray-700 p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2 text-yellow-300">Upcoming Appointments</h2>
          <ul className="space-y-1 max-h-40 overflow-y-auto">
            {upcomingAppointments.map(appt => (
              <li key={appt.id}>
                🗓️ {new Date(appt.appointmentDate).toLocaleString()} — {appt.title}
              </li>
            ))}
            {upcomingAppointments.length === 0 && <li>No upcoming appointments</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
