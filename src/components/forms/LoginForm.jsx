import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactImage from '/src/assets/images/Contacts.png';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      // Store tokens (for demo, using localStorage; consider a more secure approach for production)
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);

      onLogin?.(data.access);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start px-6 py-10 md:py-10 justify-center bg-black">
      <div className="flex flex-col w-full md:w-200 md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left side: Login Form */}
        <form
          onSubmit={handleLogin}
          className="p-8 md:p-16 flex flex-col gap-4 w-full md:w-1/2"
        >
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-blue-600 hover:underline self-start"
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>

        {/* Right side: Image */}
        <div className="hidden md:block md:w-90">
          <img
            src="/src/assets/images/Contacts.png"
            alt="Login Illustration"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
