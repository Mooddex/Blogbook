import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="text-center bg-gray-900 p-10 rounded-3xl shadow-lg max-w-xl">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Welcome to the Blogbook
        </h1>
        <p className="text-gray-400 text-lg mb-6">
          Discover, share, and manage blogs effortlessly in a clean, modern experience.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/allblogs"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl transition"
          >
            View Blogs
          </Link>
          <Link
            href="/login"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-xl transition"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
