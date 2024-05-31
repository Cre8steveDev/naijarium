import { IPost } from '@/database/models.types';
import axios from 'axios';

export async function fetchSinglePost(id: string): Promise<IPost | undefined> {
  try {
    // Simulating an asynchronous API call
    const response = await axios.get(`/api/posts/${id}`);
    const data = response.data;

    return data;
  } catch (error) {
    return undefined;
  }
}
