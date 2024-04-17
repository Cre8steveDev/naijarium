import allPosts from '../dummydata/dummyPostData';
import { TPost } from '../dummydata/dummyPostData';

export async function fetchSinglePost(id: number): Promise<TPost | undefined> {
  try {
    // Simulating an asynchronous API call
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Find the post with the matching id
    const post = allPosts.find((post) => post.postId === id);

    return post;
  } catch (error) {
    console.error('Error fetching single post:', error);
    return undefined;
  }
}
