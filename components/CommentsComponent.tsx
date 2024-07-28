import React from 'react';
import CommentCard from './ui/CommentCard';

type CommentsArray = Comment[];

export type Comment = {
  author_picture: string;
  author_username: string;
  author: string;
  content: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
  edited: boolean;
  _id: string;
};

// Define Component here.
const CommentsComponent = ({
  comments,
  currentUserId,
}: {
  comments: CommentsArray;
  currentUserId: string;
}) => {
  // Map Through the comments comment and return
  return (
    <div className="overflow-y-scroll h-full">
      <p className="font-black text-2xl sm:text-4xl text-slate-200 mb-2">{`${
        comments.length
      } COMMENT${comments.length === 1 ? '' : 'S'}`}</p>

      {/* Map Through All the comments */}
      {comments.map((comment, index) => {
        return (
          <CommentCard
            key={index}
            comment={comment}
            userId={currentUserId}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default CommentsComponent;
