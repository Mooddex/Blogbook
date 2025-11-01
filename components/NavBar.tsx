'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/auth/verify');
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await api.post('/api/auth/logout');
    setLoggedIn(false);
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700 shadow-sm px-6 py-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-bold text-blue-400 hover:opacity-90 transition"
      >
        Blogsbook
      </Link>

      <div className="flex gap-4 items-center text-sm font-medium">
        <Link
          href="/allblogs"
          className="text-gray-300 hover:text-blue-400 transition"
        >
          BLOGS
        </Link>

        {!loading && (
          <>
            {loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
