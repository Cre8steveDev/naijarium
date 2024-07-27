import { NextRequest, NextResponse } from 'next/server';

import { Post } from '@/database/models';
import { IPost } from '@/database/models.types';
import connectDB from '@/database/connection';

async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  let { id } = params;

  try {
    await connectDB();
    //@ts-ignore
    const findPost = await Post.findOne({ _id: id });
    await findPost.populate('comments');

    return NextResponse.json(findPost, { status: 200 });

    // Catch Block Below
  } catch (error: any & { message: string }) {
    console.log(error.message);

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
