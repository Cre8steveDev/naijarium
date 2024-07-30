import BASEURL from '@/constants/BASEURL';
import { IPost } from '@/database/models.types';
import axios from 'axios';

export async function fetchSinglePost(
  slug: string
): Promise<IPost | undefined> {
  try {
    // Simulating an asynchronous API call
    const response = await axios.get(`${BASEURL}/api/posts/${slug}`);
    const data = response.data;

    return data;
  } catch (error) {
    return undefined;
  }
}
