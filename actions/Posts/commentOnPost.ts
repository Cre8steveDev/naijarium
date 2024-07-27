'use server';

import { CommentDataType } from '@/components/ui/CommentOnPost';
import connectDB from '@/database/connection';
import { Comment, Post } from '@/database/models';

async function commentOnPost(commentData: CommentDataType) {
  // Log out parameter
  //   Try to update the post
  try {
    // Connect to Database
    await connectDB();

    // Create Comment Object and save it.
    const newComment = new Comment({
      author: commentData.userId,
      post: commentData.postId,
      author_username: commentData.author_username,
      author_picture: commentData.author_picture,
      content: commentData.commentText,
    });

    // Save comment to Database
    const savedComment = await newComment.save();

    // Find Post by the postId and then add the comment._id in the array
    // @ts-ignore
    const result = await Post.findByIdAndUpdate(
      commentData.postId,
      { $addToSet: { comments: savedComment._id } },
      {
        new: true,
      }
    );

    return JSON.stringify(result);
  } catch (error) {
    return JSON.stringify(null);
  }
}

export default commentOnPost;

/**
   picture1,
      picture2,
      commentText,
      postId,
      userId,
 */
