import React, { useState, useEffect } from 'react';
import { loadPatients, savePatients } from '../utils/localStorageHelpers';
import PatientForm from '../components/PatientForm.jsx';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load patients on mount
  useEffect(() => {
    setPatients(loadPatients());
  }, []);

  // Save or update patient
  const handleSave = (patient) => {
    let updated;
    if (editing) {
      updated = patients.map(p => p.id === editing.id ? patient : p);
    } else {
      const existingNumbers = patients.map(p => parseInt(p.id.replace('P', ''))).filter(n => !isNaN(n));
      const newId = `P${existingNumbers.length ? Math.max(...existingNumbers) + 1 : 1}`;
      updated = [...patients, { ...patient, id: newId }];
    }
    setPatients(updated);
    savePatients(updated);
    setEditing(null);
    setShowForm(false);
  };

  // Delete patient
  const handleDelete = (id) => {
    const updated = patients.filter(p => p.id !== id);
    setPatients(updated);
    savePatients(updated);
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-blue-400">👥 Manage Patients</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Total Patients" color="text-blue-300" value={patients.length} />
        <Card title="Latest Patient" color="text-green-300" value={patients.length ? patients[patients.length - 1].name : 'N/A'} />
        <Card title="Oldest Patient" color="text-purple-300" value={patients.length ? patients[0].name : 'N/A'} />
        <Card title="Data Saved" color="text-yellow-300" value={patients.length ? '✅ Yes' : '⚠ No data'} />
      </div>

      {/* Add patient button */}
      <button
        onClick={() => { setEditing(null); setShowForm(true); }}
        className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow hover:shadow-lg transition"
      >
        ➕ Add New Patient
      </button>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-300">
              {editing ? 'Edit Patient' : 'Add New Patient'}
            </h2>
            <PatientForm onSave={handleSave} editing={editing} />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patients table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-2">Patient ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Health Info</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => (
              <tr key={p.id} className={`hover:bg-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.dob}</td>
                <td className="p-2">{p.healthInfo}</td>
                <td className="p-2">
                  <button
                    onClick={() => { setEditing(p); setShowForm(true); }}
                    className="text-blue-400 hover:text-blue-300 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="5" className="p-2 text-center text-gray-400">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Small reusable card component
function Card({ title, color, value }) {
  return (
    <div className="bg-gray-700 rounded-xl p-4 shadow hover:shadow-xl hover:ring hover:ring-blue-500/50 transition">
      <h2 className={`font-semibold mb-1 ${color}`}>{title}</h2>
      <p className="truncate font-bold">{value}</p>
    </div>
  );
}
