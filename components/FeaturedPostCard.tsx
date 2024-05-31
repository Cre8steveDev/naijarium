import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IPost } from '@/database/models.types';
import PostStats from './ui/PostStats';

type FeaturedPostCardProps = {
  post: IPost;
};

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
  const date = new Date(post.createdAt!);
  const monthInWord = date.toLocaleString('default', { month: 'long' });

  const formattedDate = `${date.getDate()}, ${monthInWord} ${date.getFullYear()} ${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`;

  return (
    <section className="bg-white shadow-md mb-4 p-4 rounded-md">
      <Link href={`/post/${post._id}`}>
        <div className="flex gap-3 mb-2">
          <div className="w-[40px]">
            <Image
              src={post.author_picture}
              alt="Author Image"
              height={40}
              width={40}
              className="rounded-full"
            />
          </div>
          <div className="text-gray-800">
            <p>{post.author_username}</p>
            <p className="text-xs">{formattedDate}</p>
          </div>
        </div>
        <h2 className="font-bold text-[17px] text-green-900 hover:text-orange-600 transition ease-in">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm sm:text-md">
          {post.content.slice(3, 66) + '...'}
        </p>
      </Link>
      <div className="flex justify-between mt-2 sm:mt-4">
        <div className="flex gap-3">
          <Link href={`/posts/category/${post.category}`}>
            <div className="bg-gray-200 hover:bg-opacity-80 p-1 sm:p-2 rounded-md text-gray-700 text-xs">
              {post.category}
            </div>
          </Link>
        </div>

        <PostStats
          views={post.views}
          comments={post.comments!.length}
          upvotes={post.upvotes?.length!}
        />
      </div>
    </section>
  );
};

export default FeaturedPostCard;
