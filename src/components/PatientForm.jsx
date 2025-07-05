import React, { useState, useEffect } from 'react';

export default function PatientForm({ onSave, editing }) {
  const [form, setForm] = useState({ name: '', dob: '', contact: '', healthInfo: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({ name: '', dob: '', contact: '', healthInfo: '' });
    }
  }, [editing]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.dob || !form.contact || !form.healthInfo) {
      setError('All fields are required!');
      return;
    }
    setError('');
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 sm:p-5 md:p-6 rounded shadow mb-4 max-w-screen-sm mx-auto"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-3 text-yellow-300">
        {editing ? '✏ Edit Patient' : '➕ Add Patient'}
      </h2>
      {error && <div className="text-red-400 mb-2">{error}</div>}

      {/* Patient Name */}
      <div className="mb-3">
        <label className="block text-gray-300 mb-1">Patient Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Date of Birth */}
      <div className="mb-3">
        <label className="block text-gray-300 mb-1">Date of Birth</label>
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Contact */}
      <div className="mb-3">
        <label className="block text-gray-300 mb-1">Contact</label>
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Health Info */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Health Info</label>
        <input
          name="healthInfo"
          value={form.healthInfo}
          onChange={handleChange}
          placeholder="e.g. No allergies"
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
      >
        {editing ? 'Save Changes' : 'Add Patient'}
      </button>
    </form>
  );
}
