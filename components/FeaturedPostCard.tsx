import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IPost } from '@/database/models.types';
import PostStats from './ui/PostStats';
import CategoryTag from './ui/CategoryTag';

type FeaturedPostCardProps = {
  post: IPost;
  index: number;
};

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post, index }) => {
  const date = new Date(post.createdAt!);
  const monthInWord = date.toLocaleString('default', { month: 'long' });

  const formattedDate = `${date.getDate()}, ${monthInWord} ${date.getFullYear()} ${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`;

  // Return JSX
  return (
    <section
      className={`${
        index % 2 === 0 ? 'bg-white' : 'bg-green-100 bg-opacity-65'
      } shadow-md mb-4 p-4 rounded-md`}
    >
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
            <p className="font-bold text-gray-600">{post.author_username}</p>
            <p className="text-[10px] sm:text-xs">{formattedDate}</p>
          </div>
        </div>

        <h2 className="font-bold text-[14px] sm:text-lg text-green-900 hover:text-orange-600 transition ease-in">
          {post.title}
        </h2>
        <p className="text-gray-600 text-xs sm:text-md">
          {post.content.slice(3, 100) + '...'}
        </p>
      </Link>

      <div className="flex justify-between mt-2 sm:mt-4">
        <CategoryTag category={post.category} />

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
