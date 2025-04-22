import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@state/AuthContext';

const SignupForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    // 1) Register the user
    const res = await fetch('/api/users/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const registerData = await res.json();
    if (!res.ok) {
      if (registerData.username) {
        setError(registerData.username.join(' '));
      } else if (registerData.detail) {
        setError(registerData.detail);
      } else {
        setError('Registration failed.');
      }
      return;
    }

    // 2) Auto‑login with the same credentials
    const loginRes = await fetch('/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) {
      throw new Error(loginData.detail || 'Login after registration failed');
    }

    login(loginData.access, loginData.refresh);

    // 3) Redirect
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-md flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold">Sign Up</h2>
      {[
        { label: 'First Name', name: 'first_name', type: 'text' },
        { label: 'Last Name', name: 'last_name', type: 'text' },
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Confirm Password', name: 'password2', type: 'password' },
      ].map(({ label, name, type }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className="mb-1 font-medium">
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            required
            autoComplete={name === 'email' ? 'email' : 'off'}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
