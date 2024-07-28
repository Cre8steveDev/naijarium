'use server';

import connectDB from '@/database/connection';
import { Comment } from '@/database/models';

/***
 * Implement logic to fetch data from the database
 * for the home page. This should be paginated and also
 * be able to filter based on hot topics, Favourites
 * Featured Posts
 */

async function editComment(commentId: string, content: string) {
  try {
    // Connect to Database
    await connectDB();
    // Find a Comment by its id and update the content
    // @ts-ignore
    const newComment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
      },
      {
        $set: { content: content, edited: true },
      },
      { new: true }
    );

    return JSON.stringify(newComment);
  } catch (error) {
    console.log(error);
    return JSON.stringify(null);
  }
}

export default editComment;
