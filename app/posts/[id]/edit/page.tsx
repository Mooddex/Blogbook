'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface Blog {
  title: string;
  body: string;
}

const EditBlogPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);

  const [form, setForm] = useState<Blog>({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/api/posts/${id}`);
        setForm({ title: data.title, body: data.body });
        setLoading(false);
      } catch (err) {
        setError('Failed to load blog');
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/api/posts/${id}`, form);
      router.push(`/post/${id}`);
    } catch (err) {
      setError('Failed to update post');
    }
  };

  if (loading) return <p className="text-center py-12 text-gray-400">Loading...</p>;
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
          Edit Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-300 mb-1">
              Content
            </label>
            <textarea
              id="body"
              name="body"
              value={form.body}
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Update Post
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-gray-200 underline font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPage;
