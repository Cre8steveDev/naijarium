/**
 * The Post Creation Endpoint
 */

import connectDB from '@/database/connection';
import { Post } from '@/database/models';
import { IPost } from '@/database/models.types';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const { pageNumber, filtertype } = await req.json();

  const pageSize = 15;
  const skip = (pageNumber - 1) * pageSize;

  try {
    await connectDB();

    if (filtertype === 'featured') {
      const totalPosts = await Post.countDocuments({ isFeatured: true });

      //@ts-ignore
      const retrievedPosts = await Post.find({ isFeatured: true })
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .skip(skip);

      return NextResponse.json({ retrievedPosts, totalPosts }, { status: 200 });
    }

    const totalPosts = await Post.countDocuments();
    if (filtertype === 'new') {
      const retrievedPosts = await Post.aggregate([
        {
          $addFields: {
            content: {
              $substrBytes: ['$content', 0, 120],
            },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);

      return NextResponse.json({ retrievedPosts, totalPosts }, { status: 200 });
    }

    if (filtertype === 'favourite') {
      const retrievedPosts = await Post.aggregate([
        {
          $addFields: {
            upvotesCount: { $size: '$upvotes' },
          },
        },
        {
          $sort: { upvotesCount: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);

      return NextResponse.json({ retrievedPosts, totalPosts }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: 'Unable to Retrieve Posts at this time. Try again later.',
      },
      { status: 500 }
    );
  }
}

// export { POST };

// if (filtertype === 'featured') {
//   //@ts-ignore
//   const retrievedPosts = await Post.find({ isFeatured: true })
//     .limit(pageSize)
//     .sort({ createdAt: -1 })
//     .skip(skip);

//   return NextResponse.json({ retrievedPosts }, { status: 200 });
// }
