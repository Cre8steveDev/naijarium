/**
 * The Post Creation Endpoint
 */

import connectDB from '@/database/connection';
import { Post } from '@/database/models';
import { NextResponse, NextRequest } from 'next/server';

async function POST(req: NextRequest, res: NextResponse) {
  const {
    title,
    category,
    post_content,
    post_picture1,
    post_picture2,
    author_id,
    author_username,
    author_picture,
  } = await req.json();

  try {
    await connectDB();

    // First check if a Post with that exact title already
    //exists in the Database
    //@ts-ignore
    const existingPost = await Post.findOne({ title });

    if (existingPost)
      return NextResponse.json(
        {
          message: 'Sorry. You cannot create a post with the same title',
        },
        { status: 403 }
      );

    /** Integrate AI for Sentiment Analysis */

    const slug = (title as string).replaceAll(' ', '-').toLowerCase();
    console.log('=======================');
    console.log(author_picture);
    console.log(author_username);
    console.log('=======================');

    //@ts-ignore
    const post = await Post.create({
      title,
      category,
      content: post_content,
      author: author_id,
      post_picture1,
      post_picture2,
      author_username,
      author_picture,
      slug,
    });

    console.log(post);

    return NextResponse.json(
      {
        message: 'Your Post was Successfully Published',
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

export { POST };
