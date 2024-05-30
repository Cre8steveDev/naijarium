'use server';

import connectDB from '@/database/connection';
import { Post } from '@/database/models';
import { IPost } from '@/database/models.types';
import axios from 'axios';

/***
 * Implement logic to fetch data from the database
 * for the home page. This should be paginated and also
 * be able to filter based on hot topics, Favourites
 * Featured Posts
 */

async function fetchFrontPageWithFilters(
  filtertype: string,
  pageNumber: number
): Promise<IPost[] | null> {
  try {
    // Connect to Database
    await connectDB();

    // const featuredPosts = await axios.post('http://localhost:3000/api/posts', {
    //   filtertype,
    //   pageNumber,
    // });

    // console.log(featuredPosts);
    return [];
  } catch (error) {
    console.log(error);
  }

  return null;
}

export default fetchFrontPageWithFilters;
