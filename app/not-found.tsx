import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-6xl font-bold text-violet-700 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Blog Not Found</p>
      <Link
        href="/dashboard"
        className="inline-block bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
