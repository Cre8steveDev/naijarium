'use server';

import connectDB from '@/database/connection';
import { Post } from '@/database/models';

/***
 * Implement logic to fetch data from the database
 * for the home page. This should be paginated and also
 * be able to filter based on hot topics, Favourites
 * Featured Posts
 */

async function editPostAction(
  postId: string,
  content: string,
  picture1: string,
  picture2: string
) {
  try {
    // Connect to Database
    await connectDB();
    // Find a Post by its id and update

    let updateOperation;

    if (picture1 !== '' && picture2 === '') {
      updateOperation = {
        $set: { content: content, post_picture1: picture1 },
      };
    } else if (picture2 !== '' && picture1 === '') {
      updateOperation = {
        $set: { content: content, post_picture2: picture2 },
      };
    } else {
      updateOperation = {
        $set: { content: content },
      };
    }

    // @ts-ignore
    await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      updateOperation,
      { new: true }
    );

    return JSON.stringify(true);
  } catch (error) {
    console.log(error);
    return JSON.stringify(false);
  }
}

export default editPostAction;
