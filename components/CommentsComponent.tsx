import React from 'react';
import CommentCard from './ui/CommentCard';

type CommentsArray = Comment[];

export type Comment = {
  author_picture: string;
  author_username: string;
  content: string;
  likes: string[];
  createdAt: string;
  _id: string;
};

const CommentsComponent = ({ comments }: { comments: CommentsArray }) => {
  // Map Through the comments comment and return
  return (
    <div className="overflow-y-scroll h-full">
      {comments.map((comment, index) => {
        return <CommentCard key={index} comment={comment} />;
      })}
    </div>
  );
};

export default CommentsComponent;
