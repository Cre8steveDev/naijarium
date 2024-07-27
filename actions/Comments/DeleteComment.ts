'use server';

import connectDB from '@/database/connection';
import { Comment, Post } from '@/database/models';

async function deleteComment(commentId: string, postId: string) {
  try {
    // Connect to Database
    await connectDB();

    // Find the Post and remove the comment from the comments array
    //@ts-ignore
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

    // Now Delete the Comment Document from the Comments Collection
    // @ts-ignore
    await Comment.findByIdAndDelete(commentId);

    return JSON.stringify({ success: true });
  } catch (error) {
    console.log(error);
    return JSON.stringify(null);
  }
}

export default deleteComment;
