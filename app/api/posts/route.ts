/**
 * The Post Creation Endpoint
 */

import connectDB from '@/database/connection';
import { Post } from '@/database/models';
import { IPost } from '@/database/models.types';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const { pageNumber, filterType } = await req.json();

  console.log(req);
  console.log('HIT THE ENDPOINT');

  const pageSize = 10;
  const skip = (pageNumber - 1) * pageSize;

  try {
    await connectDB();

    if (filterType === 'featured') {
      //@ts-ignore
      const retrievedPosts = Post.find({ isFeatured: true })
        .limit(pageSize)
        .skip(skip);

      console.log('=============================');
      console.log(retrievedPosts);
    }

    return NextResponse.json(
      [
        {
          message: 'Your Post was Successfully Published',
        },
      ],
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Oops! An Error Occurred. Please Try again later.',
      },
      { status: 500 }
    );
  }
}

// export { POST };
