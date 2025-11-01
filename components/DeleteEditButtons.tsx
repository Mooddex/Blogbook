'use client';

import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useState } from 'react';

const DeleteEditButtons = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await api.delete(`/api/posts/${id}`);
      router.push('/dashboard');
    } catch (error) {
      alert('Failed to delete the post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 flex flex-wrap gap-3 justify-start">
      <button
        onClick={() => router.push(`/post/${id}/edit`)}
        className="px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className={`px-5 py-2 bg-red-600 text-white font-semibold rounded-lg transition ${
          loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-red-700'
        }`}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>

      <button
        onClick={() => router.push('/dashboard')}
        className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition"
      >
        Back
      </button>
    </div>
  );
};

export default DeleteEditButtons;
