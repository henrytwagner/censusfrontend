// src/pages/ProfileEdit.jsx
import React, { useState, useEffect } from 'react';
import { useAuthFetch } from '@utils/authFetch';
import { useNavigate } from 'react-router-dom';

export default function ProfileForm() {
  const authFetch = useAuthFetch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profile_image_url: '',
    bio: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load current profile
  useEffect(() => {
    (async () => {
      try {
        const res = await authFetch('/api/users/me/');
        const data = await res.json();
        if (!res.ok) throw new Error('Could not load profile');
        setForm({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          profile_image_url: data.profile_image_url || '',
          bio: data.bio || '',
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load your profile.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await authFetch('/api/users/me/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data.detail || Object.values(data).flat().join(' ');
        throw new Error(msg);
      }
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label htmlFor="first_name" className="mb-1 font-medium">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="last_name" className="mb-1 font-medium">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="profile_image_url" className="mb-1 font-medium">
            Profile Image URL
          </label>
          <input
            id="profile_image_url"
            name="profile_image_url"
            type="url"
            value={form.profile_image_url}
            onChange={handleChange}
            placeholder="https://..."
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {form.profile_image_url && (
          <div className="flex justify-center">
            <img
              src={form.profile_image_url}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full border"
            />
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="bio" className="mb-1 font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`mt-4 py-2 rounded-lg font-semibold text-white ${
            submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {submitting ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
