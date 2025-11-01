import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/lib/models/post';
import { verifyToken } from '@/lib/middleware/verifyToken';

// GET all posts
export async function GET() {
  try {
    await connectDB();
    
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

// CREATE new post
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { userId, error } = verifyToken(request);
    if (error || !userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, content } = await request.json();

    const post = new Post({
      title,
      content,
      author: userId
    });

    await post.save();
    await post.populate('author', 'username');

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}