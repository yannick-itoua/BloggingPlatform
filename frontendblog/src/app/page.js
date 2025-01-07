'use client';

import { useState } from 'react';
import axios from '../../utils/api';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the backend login endpoint
      const response = await axios.post('/users/login', { email, password });

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard
      router.push('/dashboard');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold p-3 rounded-lg hover:from-blue-600 hover:to-green-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-purple-500 underline hover:text-purple-700">
            Register here
          </a>
        </p>
      </div>
    </main>
  );
}
