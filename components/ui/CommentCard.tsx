import React, { useState } from 'react';
import { Comment } from '../CommentsComponent';
import Image from 'next/image';
import ParseHTMLToDom from './ParseHTMLToDom';
import DateComp from './DateComp';
import likeOrDislikeComment from '@/actions/Comments/LikeOrDislikeComment';
import deleteComment from '@/actions/Comments/DeleteComment';
import toast from 'react-hot-toast';
import EditComment from './EditComment';
import PostPictureComp from './PostPictureComp';

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
  const [selectedPicture, setSelectedPicture] = useState('');

  console.log(comment);
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
        index % 2 !== 0
          ? 'bg-white dark:bg-slate-500'
          : 'bg-slate-100 dark:bg-slate-700'
      } my-2 rounded-md p-1 px-2 sm:p-3`}
    >
      <div className={`mb-2 flex items-center gap-3`}>
        <Image
          src={thisComment.author_picture}
          width={30}
          height={30}
          className="h-[30px] w-[30px] rounded-full object-cover"
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
      <div className="my-3 flex items-center gap-2 text-black dark:text-slate-100">
        {/* Like and Dislike Button  */}
        <p className="text-xs sm:text-[15px]">{`${thisComment.likes.length} Likes`}</p>

        {userId !== 'nil' && (
          <>
            <button
              onClick={handleCommentLike}
              className={`px-[6px] py-[1px] text-[9px] sm:text-[12px] ${
                thisComment.likes.includes(userId)
                  ? 'bg-slate-400  hover:bg-slate-700'
                  : 'bg-green-300 text-black hover:bg-green-700 '
              } rounded-lg  transition-all ease-in-out`}
            >
              {thisComment.likes.includes(userId) ? 'Dislike' : 'Like'}
            </button>

            {/* Quote Comment  */}
            <button
              className="rounded-lg bg-slate-200 px-[6px] py-[1px] text-[9px] transition-all ease-in-out hover:bg-slate-800 hover:text-white dark:bg-orange-600 sm:text-[12px]"
              onClick={() => toast.error('TODO: Feature not yet implemented.')}
            >
              Quote
            </button>

            {/* Edit Comment  */}
            {thisComment.author === userId && (
              <button
                className="rounded-lg bg-slate-200 px-[6px] py-[1px] text-[9px] transition-all ease-in-out hover:bg-slate-800 hover:text-white dark:bg-green-900 sm:text-[12px]"
                onClick={() => setShowEditCommentBox(true)}
              >
                Edit
              </button>
            )}

            {/* Delete Comment  */}
            {thisComment.author === userId && (
              <button
                className="rounded-lg bg-slate-200 px-[6px] py-[1px] text-[9px] transition-all ease-in-out hover:bg-red-500 hover:text-white dark:bg-red-800 sm:text-[12px]"
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
          <p className="ml-[20px] text-[9px] text-orange-700 dark:text-slate-300 sm:text-[12px]">
            Edited
          </p>
        )}
      </div>

      {/* Picture View Overlay Here */}

      <div className="flex border-y-2 border-y-slate-200">
        {thisComment &&
          thisComment.picture1 &&
          thisComment.picture1! !== '' && (
            <PostPictureComp
              picture_url={thisComment.picture1 || ''}
              setSelectedPicture={setSelectedPicture}
              author_username={''}
              type="comment"
            />
          )}
        {thisComment &&
          thisComment.picture2 &&
          thisComment.picture2! !== '' && (
            <PostPictureComp
              picture_url={thisComment.picture2 || ''}
              setSelectedPicture={setSelectedPicture}
              author_username={''}
              type="comment"
            />
          )}
      </div>

      {/* Picture View Model Here - Comments card specific */}
      {selectedPicture !== '' && (
        <div
          onClick={() => setSelectedPicture('')}
          className="fixed left-0 top-0 z-50 flex h-screen w-full cursor-pointer flex-col items-center justify-center gap-2 bg-slate-950 bg-opacity-60 bg-fixed p-2 backdrop-blur-lg sm:p-10"
        >
          <p className="font-bold text-white">
            Click on any part of the image to close.
          </p>
          <img
            src={selectedPicture}
            alt="Picture Preview"
            className="w-full max-w-[800px]"
          />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
