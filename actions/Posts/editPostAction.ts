'use server';

import connectDB from '@/database/connection';
import { Post } from '@/database/models';

/***
 * Implement logic to fetch data from the database
 * for the home page. This should be paginated and also
 * be able to filter based on hot topics, Favourites
 * Featured Posts
 */

async function editPostAction(postId: string, content: string) {
  try {
    // Connect to Database
    await connectDB();
    // Find a Post by its id and update
    // @ts-ignore
    await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $set: { content: content },
      },
      { new: true }
    );

    return JSON.stringify(true);
  } catch (error) {
    console.log(error);
    return JSON.stringify(false);
  }
}

export default editPostAction;
