/**
 * The Post Creation Endpoint
 */

import connectDB from '@/database/connection';
import { Post } from '@/database/models';
import { NextResponse, NextRequest } from 'next/server';
import { postsCategoryNavLinks } from '@/constants/categoriesAndRoutes';

export async function POST(req: NextRequest, res: NextResponse) {
  const { pageNumber, filtertype, category } = await req.json();

  const categoryString = postsCategoryNavLinks.find(
    (categ) => categ.route === category
  )?.title;

  const pageSize = 15;
  const skip = (pageNumber - 1) * pageSize;

  try {
    await connectDB();

    const totalPosts = await Post.countDocuments({ category: categoryString });

    if (filtertype === 'new') {
      const retrievedPosts = await Post.aggregate([
        {
          $match: {
            category: categoryString,
          },
        },
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
          $match: {
            category: categoryString,
          },
        },
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
