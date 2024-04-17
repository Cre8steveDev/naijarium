'use client';

import { useEffect, useState } from 'react';
import { TPost } from '../../dummydata/dummyPostData';
import { useParams } from 'next/navigation';
import { fetchSinglePost } from '@/app/lib/fetchSinglePost';

const PostViewPage: React.FC = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState<TPost | undefined>(undefined);

  fetchSinglePost(parseInt(id as string))
    .then((response) => {
      setPost(response);
      setIsLoading(false);
    })
    .catch((error) => {
      setError('Error Fetching Post: Post might not exist');
      setPost(undefined);
    });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!post && !isLoading) {
    return <p>Post not found</p>;
  }

  return (
    <main className="px-5 py-8">
      <h1 className="text-green-900">{post!.postTitle}</h1>
      <p>{post!.postContent}</p>
    </main>
  );
};

export default PostViewPage;
