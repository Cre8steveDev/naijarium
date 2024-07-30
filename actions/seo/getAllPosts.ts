/**
 * getAll Posts Server action
 * For use in SEO Site Mapping
 */

import connectDB from '@/database/connection';
import { Post } from '@/database/models';
import { IPost } from '@/database/models.types';

async function getAllPosts(): Promise<IPost[]> {
  try {
    // Connect to Database
    await connectDB();

    // @ts-ignore
    const allPosts = await Post.find();

    return allPosts;
  } catch (error) {}

  return [];
}

export default getAllPosts;
