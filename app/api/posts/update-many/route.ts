/**
 * The Post Creation Endpoint
 */

import connectDB from '@/database/connection';
import { Post } from '@/database/models';
import { NextResponse, NextRequest } from 'next/server';

async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    //@ts-ignore
    const response = await Post.updateMany(
      {},
      {
        $set: { dateFeatured: new Date().toISOString() },
      }
    );

    return NextResponse.json(
      {
        message: 'Your Post was Successfully Published',
        response: response,
      },
      { status: 201 }
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

export { GET };
