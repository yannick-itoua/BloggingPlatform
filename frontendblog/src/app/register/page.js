'use client';

import { useState } from 'react';
import axios from '../../../utils/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // ✅ Ensure the endpoint is correct
      await axios.post('/users/register', { name, email, password });
      alert('Registration successful! Please login.');
      router.replace('/'); // Redirect to login page
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
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
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <a href="/" className="text-purple-500 underline hover:text-purple-700">
            Login here
          </a>
        </p>
      </div>
    </main>
  );
}
