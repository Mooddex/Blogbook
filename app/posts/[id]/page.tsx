import { notFound } from "next/navigation";
import api from "@/lib/axios";
import DeleteEditButtons from "@/components/DeleteEditButtons";

const getBlog = async (id: string) => {
  try {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ await params
  const blog = await getBlog(id);

  if (!blog) return notFound();

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <article className="rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-10 shadow-2xl space-y-8 border border-gray-700">
          <header>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-2">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-500">
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </header>

          <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-line leading-relaxed">
            {blog.body}
          </div>

          <footer className="pt-6 border-t border-gray-700">
            <DeleteEditButtons id={id} />
          </footer>
        </article>
      </div>
    </main>
  );
}
