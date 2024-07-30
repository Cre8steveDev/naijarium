'use server';

import connectDB from '@/database/connection';
import { Comment } from '@/database/models';

async function likeOrDislikeComment(commentId: string, userId: string) {
  try {
    // Connect to Database
    await connectDB();
    // Find a Post by its id
    // @ts-ignore
    const comment = await Comment.findById(commentId);

    let updateOperation;
    if (comment.likes.includes(userId)) {
      // User has already Liked Comment, so remove the user from like array
      updateOperation = { $pull: { likes: userId } };
    } else {
      updateOperation = { $addToSet: { likes: userId } };
    }

    // @ts-ignore
    const result = await Comment.findByIdAndUpdate(commentId, updateOperation, {
      new: true,
    });

    return JSON.stringify(result);
  } catch (error) {
    return JSON.stringify(null);
  }
}

export default likeOrDislikeComment;
