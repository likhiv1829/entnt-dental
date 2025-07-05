import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';

export default function IncidentForm({ onSave, editing, patients }) {
  const [form, setForm] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    status: '',
    nextDate: '',
    attachments: []   
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        attachments: editing.attachments || []
      });
    } else {
      setForm({
        patientId: '',
        title: '',
        description: '',
        comments: '',
        appointmentDate: '',
        cost: '',
        status: '',
        nextDate: '',
        attachments: []
      });
    }
  }, [editing]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.patientId || !form.title || !form.appointmentDate || !form.status) {
      setError('Patient, Title, Date, and Status are required!');
      return;
    }
    setError('');
    onSave(form); 
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded shadow mb-4 max-h-[80vh] overflow-y-auto w-full max-w-screen-sm mx-auto">

      <form onSubmit={handleSubmit}>
        <h2 className="text-xl md:text-2xl font-semibold mb-3 text-yellow-300">
          {editing ? '✏ Edit Incident / Appointment' : '➕ Add New Incident / Appointment'}
        </h2>

        {error && <div className="text-red-400 mb-2">{error}</div>}

        {/* Patient Select */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Select Patient</label>
          <select
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          >
            <option value="">-- Select patient --</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Root Canal"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Description</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Comments */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Comments</label>
          <input
            name="comments"
            value={form.comments}
            onChange={handleChange}
            placeholder="Any additional comments"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Appointment Date */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Appointment Date & Time</label>
          <input
            name="appointmentDate"
            type="datetime-local"
            value={form.appointmentDate}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Cost */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Cost (₹)</label>
          <input
            name="cost"
            type="number"
            value={form.cost}
            onChange={handleChange}
            placeholder="e.g. 500"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          >
            <option value="">-- Select status --</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Next Appointment Date */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">Next Appointment Date</label>
          <input
            name="nextDate"
            type="date"
            value={form.nextDate}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Attach Files</label>
          <FileUpload
            files={form.attachments}
            setFiles={(attachments) => setForm({ ...form, attachments })}
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          {editing ? 'Save Changes' : 'Add Incident'}
        </button>
      </form>
    </div>
  );
}
