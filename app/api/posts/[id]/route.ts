import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/lib/models/post";
import { verifyToken } from "@/lib/middleware/verifyToken";

// ✅ GET
export async function GET(
  req: Request,
  context: any   // ✅ <- FIX HERE
) {
  try {
    await connectDB();

    const { id } = context.params;

    const post = await Post.findById(id)
// .populate("author", "username");
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  context: any   // ✅ <- FIX HERE
) {
  try {
    await connectDB();

    const { id } = context.params;
    const { userId, error } = verifyToken(request);

    if (error || !userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.author.toString() !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, updatedAt: new Date() },
      { new: true }
    ).populate("author", "username");

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  context: any   // ✅ <- FIX HERE
) {
  try {
    await connectDB();

    const { id } = context.params;
    const { userId, error } = verifyToken(request);

    if (error || !userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.author.toString() !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
