import Link from "next/link";

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

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(blog.createdAt));

  return (
    <Link
      href={`/posts/${blog._id}`}
      className="block border border-gray-700 rounded-2xl p-6 bg-gray-900 text-gray-200 shadow-md hover:shadow-xl hover:border-blue-600 transition-all duration-200 group"
    >
      <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
        {blog.title}
      </h2>
      <p className="text-sm text-gray-400 mb-1">
        By <span className="font-medium text-white">{blog.author.username}</span>
      </p>
      <p className="text-gray-300 line-clamp-3 mb-4">{blog.content}</p>
      <p className="text-xs text-gray-500">{formattedDate}</p>
    </Link>
  );
};

export default BlogCard;
