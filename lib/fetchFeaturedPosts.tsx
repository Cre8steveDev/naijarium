import allPosts from '../dummydata/dummyPostData';
import { TPost } from '../dummydata/dummyPostData';

export async function fetchFeaturedPosts(type: string): Promise<TPost[]> {
  try {
    // Simulating an asynchronous API call
    await new Promise((resolve) => setTimeout(resolve, 10));

    const sortedPosts = allPosts
      .slice()
      .sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());

    return sortedPosts;
  } catch (error) {
    console.error('Error fetching single post:', error);
    return [];
  }
}
