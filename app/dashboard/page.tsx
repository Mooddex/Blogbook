import { cookies } from 'next/headers';
import CreateBlogForm from '@/components/CreateBlogForm';
import BlogCard from '@/components/BlogCard';
import api from '@/lib/axios';
import { redirect } from 'next/navigation';

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

async function getBlogs(): Promise<Blog[]> {
  const res = await api.get('/api/posts');
  return res.data;
}

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/');
  }

  const userRes = await fetch('http://localhost:2727/api/auth/me', {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: 'no-store',
  });

  if (!userRes.ok) {
    redirect('/');
  }

  const blogs = await getBlogs();

  return (
    <main className="bg-gray-950 min-h-screen px-4 py-10 text-gray-100">
      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Write and manage your blogs.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-2xl shadow-md">
          <CreateBlogForm />
        </section>

        <section className="space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-gray-900 p-6 rounded-2xl shadow-md">
                <BlogCard blog={blog} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No blogs found.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
