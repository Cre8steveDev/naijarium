import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FiEye } from 'react-icons/fi';
import { LuMessagesSquare } from 'react-icons/lu';
import { BiUpvote } from 'react-icons/bi';
import { IPost } from '@/database/models.types';

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
    <section className="rounded-md bg-white shadow-md p-4 mb-4">
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
        <p className="text-gray-600">{post.content.slice(3, 66) + '...'}</p>
      </Link>
      <div className="mt-4 flex justify-between">
        <div className="flex gap-3">
          <Link href={`/posts/category/${post.category}`}>
            <div className="bg-gray-200 p-2 rounded-md text-xs text-gray-700 hover:bg-opacity-80">
              {post.category}
            </div>
          </Link>
        </div>

        <div className="flex gap-2 text-gray-500 text-[14px]">
          <div className="flex items-center gap-2">
            <FiEye className=" hover:text-orange-600" /> {post.views}
          </div>

          <div className="flex items-center gap-2">
            <LuMessagesSquare className=" hover:text-orange-600" />{' '}
            {post.comments?.length}
          </div>

          <div className="flex items-center gap-2">
            <BiUpvote className=" hover:text-orange-600" />{' '}
            {post.upvotes?.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPostCard;
