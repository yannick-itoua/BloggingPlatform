'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/'); // Redirect to login if no token
      }
    }, [router]);

    return <Component {...props} />;
  };
}
