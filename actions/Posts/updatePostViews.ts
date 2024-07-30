'use server';

import connectDB from '@/database/connection';
import { Post } from '@/database/models';

/***
 * Implement logic to fetch data from the database
 * for the home page. This should be paginated and also
 * be able to filter based on hot topics, Favourites
 * Featured Posts
 */

async function updatePostViews(id: string) {
  try {
    // Connect to Database
    await connectDB();
    // Find a Post by its id and update
    // @ts-ignore
    await Post.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
  } catch (error) {}
}

export default updatePostViews;
