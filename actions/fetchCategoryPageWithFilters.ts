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

async function fetchCategoryPageWithFilters(
  category: string,
  filtertype: string = 'featured',
  pageNumber: number = 1
): Promise<{
  data: IPost[];
  totalPosts: any;
} | null> {
  try {
    // Connect to Database
    await connectDB();
    const data = { filtertype, pageNumber, category };

    const featuredPosts = await axios.post('/api/posts/category', data);

    // const featuredPosts = await axios.post(
    //   'https://naijarium.vercel.app/api/posts',
    //   data
    // );

    // const featuredPosts = await axios.post(
    //   'http://localhost:3000/api/posts/category',
    //   data
    // );

    const returnedValue = {
      data: featuredPosts.data.retrievedPosts as IPost[],
      totalPosts: featuredPosts.data.totalPosts,
    };

    return returnedValue;
  } catch (error) {}

  return null;
}

export default fetchCategoryPageWithFilters;
