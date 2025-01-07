'use client';

import { useState } from 'react';
import axios from '../../../utils/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
      Email
    </label>
    <input
      type="email"
      id="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
      Password
    </label>
    <input
      type="password"
      id="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="flex items-center justify-between">
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Login
    </button>
  </div>
</form>

    </main>
  );
}
