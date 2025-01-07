'use client';

import './globals.css';
import { useRouter, usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    router.replace('/'); // Redirect to login page
  };

  // Show Logout button only on protected pages
  const showLogoutButton = pathname !== '/' && pathname !== '/register';

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold">Blogging Platform</h1>
          {showLogoutButton && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded"
            >
              Logout
            </button>
          )}
        </header>
        {children}
      </body>
    </html>
  );
}
