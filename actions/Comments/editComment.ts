'use server';

import connectDB from '@/database/connection';
import { Comment } from '@/database/models';

/***
 * Implement logic to fetch data from the database
 * for the home page. This should be paginated and also
 * be able to filter based on hot topics, Favourites
 * Featured Posts
 */

async function editComment(
  commentId: string,
  content: string,
  picture1: string,
  picture2: string
) {
  try {
    // Connect to Database
    await connectDB();
    // Find a Comment by its id and update the content

    let updateOperation;

    if (picture1 !== '' && picture2 === '') {
      updateOperation = {
        $set: { content: content, picture1: picture1, edited: true },
      };
    } else if (picture2 !== '' && picture1 === '') {
      updateOperation = {
        $set: { content: content, picture2: picture2, edited: true },
      };
    } else {
      updateOperation = {
        $set: { content: content, edited: true },
      };
    }

    // @ts-ignore
    const newComment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
      },
      updateOperation,
      { new: true }
    );

    return JSON.stringify(newComment);
  } catch (error) {
    return JSON.stringify(null);
  }
}

export default editComment;
