import React from 'react';
import { Comment } from '../CommentsComponent';
import Image from 'next/image';
import ParseHTMLToDom from './ParseHTMLToDom';

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <div>
      <div>
        <Image
          src={comment.author_picture}
          width={30}
          height={30}
          className="w-[30px] h-[30px] object-cover"
          alt={comment.author_username}
        />
        <p>{comment.author_username}</p>
      </div>
      <div>
        <ParseHTMLToDom pageContent={comment.content || ''} />
      </div>
    </div>
  );
};

export default CommentCard;
