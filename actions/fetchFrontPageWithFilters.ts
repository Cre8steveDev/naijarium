'use server';

import connectDB from '@/database/connection';
import { Post } from '@/database/models';
import { IPost } from '@/database/models.types';

/***
 * Implement logic to fetch data from the database
 * for the home page. This should be paginated and also
 * be able to filter based on hot topics, Favourites
 * Featured Posts
 */

async function fetchFrontPageWithFilters(
  filtertype: string = 'featured',
  pageNumber: number = 1
): Promise<IPost[] | null> {
  console.log(filtertype);
  console.log(pageNumber);

  try {
    // Connect to Database
    await connectDB();

    if (filtertype === 'featured') {
      return [];
    }

    if (filtertype === 'new') {
      return [];
    }

    if (filtertype === 'favourite') {
      return [];
    }
  } catch (error) {}

  return null;
}

export default fetchFrontPageWithFilters;
