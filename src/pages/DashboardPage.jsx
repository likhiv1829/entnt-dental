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
    { status: 'Pending', count: pendingCount },
    { status: 'Completed', count: incidents.filter(inc => inc.status === 'Completed').length },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="flex-1 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4">Dashboard Overview</h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Card title="Patients Today" value={patients.length} color="text-blue-400" ring="ring-blue-500/50" />
          <Card title="Total Patients" value={patients.length} color="text-green-400" ring="ring-green-500/50" />
          <Card title="Requests" value={pendingCount} color="text-yellow-400" ring="ring-yellow-500/50" />
          <Card title="💰 Total Revenue" value={`₹ ${totalRevenue}`} color="text-purple-400" ring="ring-purple-500/50" textColor="text-purple-300" />
        </div>

        {/* Status Chart */}
        <div className="bg-gray-700 p-4 rounded-xl shadow mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-300">Incident Status Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statusData}>
              <XAxis dataKey="status" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Latest Patients */}
        <div className="bg-gray-700 p-4 rounded-xl shadow mb-6 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-blue-300">Latest Patients</h2>
          <table className="w-full text-left text-xs sm:text-sm">
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

        {/* Upcoming Appointments */}
        <div className="bg-gray-700 p-4 rounded-xl shadow mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-yellow-300">Upcoming Appointments</h2>
          <ul className="space-y-1 max-h-40 overflow-y-auto text-xs sm:text-sm">
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

function Card({ title, value, color, ring, textColor }) {
  return (
    <div className={`bg-gray-700 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:ring ${ring} transition`}>
      <h2 className={`font-semibold mb-1 sm:mb-2 ${color}`}>{title}</h2>
      <p className={`text-2xl sm:text-3xl font-bold ${textColor || ''}`}>{value}</p>
    </div>
  );
}
