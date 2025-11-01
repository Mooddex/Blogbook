'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/BlogCard';
import api from '@/lib/axios';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
}

export default function ViewAllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/posts');
      setBlogs(response.data);
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
      setError(err.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-gray-950 min-h-screen px-4 py-10 text-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-xl text-gray-400">Loading blogs...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-950 min-h-screen px-4 py-10 text-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
            <div className="text-xl text-red-400">Error loading blogs</div>
            <div className="text-gray-400">{error}</div>
            <button
              onClick={fetchBlogs}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-950 min-h-screen px-4 py-10 text-gray-100">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="space-y-6">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            All Blogs
          </h1>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-gray-900 p-6 rounded-2xl shadow-md">
                <BlogCard blog={blog} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blogs found.</p>
              <p className="text-gray-600 text-sm mt-2">
                Be the first to create a blog post!
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}