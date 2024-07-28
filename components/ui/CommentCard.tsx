import React, { useState } from 'react';
import { Comment } from '../CommentsComponent';
import Image from 'next/image';
import ParseHTMLToDom from './ParseHTMLToDom';
import DateComp from './DateComp';
import likeOrDislikeComment from '@/actions/Comments/LikeOrDislikeComment';
import deleteComment from '@/actions/Comments/DeleteComment';
import toast from 'react-hot-toast';
import EditComment from './EditComment';

const CommentCard = ({
  comment,
  userId,
  index,
}: {
  comment: Comment;
  userId: string;
  index: number;
}) => {
  // Create states to manage each comment,
  //so it can be updated or removed from DateComp
  const [thisComment, setThisComment] = useState<Comment | null>(comment);
  const [showEditCommentBox, setShowEditCommentBox] = useState(false);

  // Handle Comment LIke
  const handleCommentLike = async () => {
    try {
      const updatedComment = await likeOrDislikeComment(
        thisComment?._id!,
        userId
      );

      const parsed = JSON.parse(updatedComment);
      setThisComment(parsed);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Comment Delete
  const handleDeleteComment = async () => {
    try {
      const status = await deleteComment(
        thisComment?._id!,
        //@ts-ignore
        thisComment?.post
      );

      const parsed = JSON.parse(status);

      if (parsed) {
        setThisComment(null);
      } else {
        throw new Error('Error occured. ');
      }
    } catch (error) {
      console.log(error);
      toast.error('Unable to delete comment at this time.');
    }
  };

  // Return null for when the comment has been deleted
  if (!thisComment) return null;

  // Otherwise return the comment Element for the particular element
  return (
    <div
      className={`${
        index % 2 !== 0 ? 'bg-white' : 'bg-slate-100'
      } my-2 rounded-md p-1 sm:p-3`}
    >
      <div className={`flex gap-3 items-center mb-2`}>
        <Image
          src={thisComment.author_picture}
          width={30}
          height={30}
          className="w-[30px] h-[30px] object-cover rounded-full"
          alt={thisComment.author_username}
        />
        <p className="font-bold">{thisComment.author_username}</p>

        {/*  */}
        <div className="">
          <DateComp time={thisComment?.createdAt + ''} />
        </div>

        {/* Number of Likes  */}
      </div>
      <div>
        <ParseHTMLToDom pageContent={thisComment.content || ''} />
      </div>

      {/* Show Comment Pictures here */}

      {/* Comment Interaction */}
      <div className="flex gap-2 items-center my-3 text-black">
        {/* Like and Dislike Button  */}
        <p className="text-xs sm:text-[15px]">{`${thisComment.likes.length} Likes`}</p>
        {userId !== 'nil' && (
          <>
            <button
              onClick={handleCommentLike}
              className={`px-[6px] py-[1px] text-[9px] sm:text-[12px] ${
                thisComment.likes.includes(userId)
                  ? 'bg-slate-400  hover:bg-slate-700'
                  : 'bg-green-300 hover:bg-green-700 '
              } rounded-lg  transition-all ease-in-out`}
            >
              {thisComment.likes.includes(userId) ? 'Dislike' : 'Like'}
            </button>

            {/* Quote Comment  */}
            <button
              className="px-[6px] py-[1px] text-[9px] sm:text-[12px]  bg-slate-200 rounded-lg hover:bg-slate-800 hover:text-white transition-all ease-in-out"
              onClick={() => toast.error('TODO: Feature not yet implemented.')}
            >
              Quote
            </button>

            {/* Edit Comment  */}
            {thisComment.author === userId && (
              <button
                className="px-[6px] py-[1px] text-[9px] sm:text-[12px] bg-slate-200 rounded-lg hover:bg-slate-800 hover:text-white transition-all ease-in-out"
                onClick={() => setShowEditCommentBox(true)}
              >
                Edit
              </button>
            )}

            {/* Delete Comment  */}
            {thisComment.author === userId && (
              <button
                className="px-[6px] py-[1px] text-[9px] sm:text-[12px]  bg-slate-200 rounded-lg hover:bg-red-500 hover:text-white transition-all ease-in-out"
                onClick={handleDeleteComment}
              >
                Delete
              </button>
            )}

            {showEditCommentBox && thisComment.author === userId && (
              <EditComment
                commentId={thisComment._id}
                initialCommentContent={thisComment.content}
                setShowEditCommentBox={setShowEditCommentBox}
                setThisComment={setThisComment}
              />
            )}
          </>
        )}

        {thisComment.edited && (
          <p className="text-[12px] ml-[20px] text-orange-700">Edited</p>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
