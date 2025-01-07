'use client';

import { useEffect, useState } from 'react';
import axios from '../../../utils/api';


export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/blogs').then((response) => setBlogs(response.data));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <ul className="mt-4">
        {blogs.map((blog) => (
          <li key={blog._id} className="p-2 mb-2 bg-white shadow rounded">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-700">{blog.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
