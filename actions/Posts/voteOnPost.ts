'use server';

import connectDB from '@/database/connection';
import { Post } from '@/database/models';

async function voteOnPost(id: string, userId: string) {
  try {
    // Connect to Database
    await connectDB();
    // Find a Post by its id
    // @ts-ignore
    const post = await Post.findById(id);

    let updateOperation;
    if (post.upvotes.includes(userId)) {
      // User has already upvoted, so remove the upvote
      updateOperation = { $pull: { upvotes: userId } };
    } else {
      // User hasn't upvoted, so add the upvote
      updateOperation = { $addToSet: { upvotes: userId } };
    }

    // @ts-ignore
    await Post.findByIdAndUpdate(id, updateOperation, {
      new: true,
    });

    // @ts-ignore
    const result = await Post.findById(id);
    await result.populate('comments');

    return JSON.stringify(result);
  } catch (error) {
    return JSON.stringify(null);
  }
}

export default voteOnPost;
