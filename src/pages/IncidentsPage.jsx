import React, { useState, useEffect } from 'react';
import { loadIncidents, saveIncidents, loadPatients } from '../utils/localStorageHelpers';
import IncidentForm from '../components/IncidentForm.jsx';

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIncidents(loadIncidents());
    setPatients(loadPatients());
  }, []);

  const handleSave = (incident) => {
    let updated;
    if (editing) {
      updated = incidents.map(i => i.id === editing.id ? incident : i);
    } else {
      updated = [...incidents, { ...incident, id: Date.now().toString() }];
    }
    setIncidents(updated);
    saveIncidents(updated);
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updated = incidents.filter(i => i.id !== id);
    setIncidents(updated);
    saveIncidents(updated);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-400">📅 Manage Incidents / Appointments</h1>
        <button 
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded shadow"
        >
          ➕ Add Incident
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-yellow-300">
              
            </h2>
            <IncidentForm onSave={handleSave} editing={editing} patients={patients} />
            <div className="mt-3 flex justify-end">
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

      {/* Table */}
      <div className="overflow-x-auto rounded">
        <table className="w-full text-left bg-gray-700 text-gray-100 rounded shadow text-xs sm:text-sm">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-2">Patient</th>
              <th className="p-2">Title</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Description</th>
              <th className="p-2">Cost</th>
              <th className="p-2">Next Apt. Date</th>
              <th className="p-2">File</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 && (
              <tr>
                <td colSpan="9" className="p-2 text-center text-gray-400">No incidents found</td>
              </tr>
            )}
            {incidents.map(i => {
              const patient = patients.find(p => p.id === i.patientId);
              return (
                <tr key={i.id} className="border-t border-gray-600 hover:bg-gray-600">
                  <td className="p-2">{patient ? patient.name : "Unknown"}</td>
                  <td className="p-2">{i.title}</td>
                  <td className="p-2">{new Date(i.appointmentDate).toLocaleDateString()}</td>
                  <td className="p-2">{i.status}</td>
                  <td className="p-2">{i.description}</td>
                  <td className="p-2">₹ {i.cost}</td>
                  <td className="p-2">
                    {i.nextAppointmentDate
                      ? new Date(i.nextAppointmentDate).toLocaleDateString()
                      : new Date(new Date(i.appointmentDate).getTime() + 24*60*60*1000).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {i.attachments && i.attachments.length > 0 
                      ? i.attachments.map((f, idx) => (
                          <a key={idx} href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                            {f.name}
                          </a>
                        ))
                      : "No file"}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <button 
                      onClick={() => { setEditing(i); setShowForm(true); }}
                      className="text-blue-400 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(i.id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
