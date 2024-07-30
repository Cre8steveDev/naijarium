import { NextRequest, NextResponse } from 'next/server';

import { Post } from '@/database/models';
import { IPost } from '@/database/models.types';
import connectDB from '@/database/connection';

async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  let { slug } = params;

  try {
    await connectDB();
    //@ts-ignore
    const findPost = await Post.findOne({ slug: slug });
    await findPost.populate('comments');

    return NextResponse.json(findPost, { status: 200 });

    // Catch Block Below
  } catch (error: any & { message: string }) {
    return NextResponse.json(
      {
        error: true,
        message: 'Sorry, the requested post cannot be found. Check URL.',
      },
      { status: 404 }
    );
  }
}

export { GET };
