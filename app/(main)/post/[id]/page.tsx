'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchSinglePost } from '@/lib/fetchSinglePost';
import { IPost } from '@/database/models.types';
import toast, { Toaster } from 'react-hot-toast';
import ParseHTMLToDom from '../../../../components/ui/ParseHTMLToDom';
import Image from 'next/image';
import PostStats from '../../../../components/ui/PostStats';
import PostPictureComp from '../../../../components/ui/PostPictureComp';
import CategoryTag from '../../../../components/ui/CategoryTag';
import Link from 'next/link';

const PostViewPage: React.FC = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ status: false, message: '' });
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [showPicturePreview, setShowPicturePreview] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState('');

  useEffect(() => {
    // Fetch the post by its ID
    fetchSinglePost(id as string)
      .then((postData) => {
        // If Post not found (i.e undefined) throw error
        if (!postData)
          throw new Error(
            'Sorry, there was a problem fetching the requested post. 🫠'
          );

        // Log data and set page accordingly
        toast.success('Enjoy reading and be respectful. 😄');
        setPost(postData);

        // Reset Page loading state
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
        setError({
          status: true,
          message: error.message,
        });

        // setPost(undefined);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error.status) {
    return <p>Error: {error.message}</p>;
  }

  if (!post && !isLoading) {
    return <p>Post not found</p>;
  }

  // Return JSX
  return (
    <main className="px-5 md:px-10 py-8 cursor-default bg-white rounded-xl  sm:mt-[2.15rem]">
      <h1 className="text-green-900 text-xl sm:text-3xl font-extrabold">
        {post?.title}
      </h1>

      {/* Define Post Stats Here */}
      <div className="w-full flex justify-between my-3">
        {/* User name, date created */}
        <Link
          href={`/user/profile/${post?.author_username}`}
          className="flex items-center font-bold hover:opacity-65 transition-opacity ease-in-out"
        >
          <Image
            src={post?.author_picture!}
            alt={post?.author_username!}
            width={35}
            height={35}
            className="rounded-full"
          />
          <p className="text-xs sm:text-lg">@{post?.author_username}</p>
        </Link>
        {/* Post stats */}
        <div className="flex gap-3 items-center">
          <PostStats
            views={post?.views!}
            comments={post?.comments?.length!}
            upvotes={post?.upvotes?.length!}
          />
          <CategoryTag category={post?.category + ''} />
        </div>
      </div>
      <hr className="my-2" />
      {/* Insert Content here */}
      <ParseHTMLToDom pageContent={post?.content || ''} />

      {/* Picture View Overlay Here */}
      {post?.post_picture1 !== '' ||
        (post?.post_picture2 !== '' && (
          <div>
            <PostPictureComp
              picture_url={post?.post_picture1 || ''}
              setSelectedPicture={setSelectedPicture}
              author_username={post?.author_username || ''}
            />

            <PostPictureComp
              picture_url={post?.post_picture2 || ''}
              setSelectedPicture={setSelectedPicture}
              author_username={post?.author_username || ''}
            />
          </div>
        ))}
      {/* Picture View Model Here  */}
      {showPicturePreview && <div></div>}

      {/* Toast */}
      <Toaster />
    </main>
  );
};

export default PostViewPage;
