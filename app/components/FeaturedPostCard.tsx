import React from 'react';
import { TPost } from '../dummydata/dummyPostData';
import Image from 'next/image';
import Link from 'next/link';

import { FiEye } from 'react-icons/fi';
import { LuMessagesSquare } from 'react-icons/lu';
import { BiUpvote } from 'react-icons/bi';

type FeaturedPostCardProps = {
  post: TPost;
};

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
  const date = new Date(post.dateCreated);
  const monthInWord = date.toLocaleString('default', { month: 'long' });

  const formattedDate = `${date.getDate()}, ${monthInWord} ${date.getFullYear()} ${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`;

  return (
    <section className="rounded-md bg-white shadow-md p-4 mb-4">
      <Link href={`/post/${post.postId}`}>
        <div className="flex gap-3 mb-2">
          <div className="w-[40px]">
            <Image
              src={post.authorImg}
              alt="Author Image"
              height={40}
              width={40}
              className="rounded-full"
            />
          </div>
          <div className="text-gray-800">
            <p>{post.authorName}</p>
            <p className="text-xs">{formattedDate}</p>
          </div>
        </div>
        <h2 className="font-bold text-[17px] text-green-900 hover:text-orange-600 transition ease-in">
          {post.postTitle}
        </h2>
        <p className="text-gray-600">{post.postContent.slice(0, 66) + '...'}</p>
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
            <FiEye className=" hover:text-orange-600" /> {post.postViews}
          </div>

          <div className="flex items-center gap-2">
            <LuMessagesSquare className=" hover:text-orange-600" />{' '}
            {post.postComments.length}
          </div>

          <div className="flex items-center gap-2">
            <BiUpvote className=" hover:text-orange-600" /> {post.upVotes}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPostCard;
