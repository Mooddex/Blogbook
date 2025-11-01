'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

const CreateBlogForm = () => {
  const [inputs, setInputs] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/posts', inputs, { withCredentials: true });
      router.refresh();
      setInputs({ title: '', content: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-gray-900 border border-gray-700 shadow-lg rounded-2xl p-8 mt-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Create a New Blog</h2>

      <input
        name="title"
        value={inputs.title}
        onChange={handleChange}
        placeholder="Blog Title"
        className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      <textarea
        name="content"
        value={inputs.content}
        onChange={handleChange}
        placeholder="Write your blog content here..."
        rows={6}
        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-60"
      >
        {loading ? 'Creating...' : 'Create Blog'}
      </button>

      {error && (
        <p className="text-red-400 text-sm text-center mt-2 bg-red-900 p-2 rounded">
          {error}
        </p>
      )}
    </form>
  );
};

export default CreateBlogForm;
