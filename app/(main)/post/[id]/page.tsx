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
import updatePostViews from '@/actions/Posts/updatePostViews';
import PostAction from '@/components/ui/PostAction';
import { useSession } from 'next-auth/react';
import voteOnPost from '@/actions/Posts/voteOnPost';
import CommentOnPostComponent from '@/components/ui/CommentOnPost';
import { User } from 'next-auth';
import CommentsComponent from '@/components/CommentsComponent';
import LoadingPage from '@/components/ui/LoadingPage';
import ContentNotFound from '@/components/ui/ContentNotFound';
import DateComp from '@/components/ui/DateComp';

// Define Page Component
const PostViewPage: React.FC = () => {
  const { id } = useParams();

  // Get SignedIn user Data
  const { data: session, status } = useSession();
  const user: User & any = session?.user;

  // Define component States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ status: false, message: '' });
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [showPicturePreview, setShowPicturePreview] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showReplyCommentBox, setShowReplyCommentBox] = useState(false);
  const [refreshPostPage, setRefreshPostPage] = useState(0);

  useEffect(() => {
    // Fetch the post by its ID
    fetchSinglePost(id as string)
      .then((postData) => {
        // If Post not found (i.e undefined) throw error
        if (!postData)
          throw new Error(
            'Sorry, there was a problem fetching the requested post. 🫠'
          );

        // Set page content and update page view accordingly
        setPost(postData);
        updatePostViews(id as string);

        console.log(postData);

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
      });
  }, [refreshPostPage]);

  // Handle Post Upvotes
  const handlePostVote = async () => {
    try {
      // @ts-ignore
      const updatedPost = await voteOnPost(String(post?._id), String(user._id));

      // Use json to pase the returned updated post
      const parsedPost = JSON.parse(updatedPost);

      if (parsedPost) {
        setPost(parsedPost);
      }
      if (!parsedPost) throw new Error('Error');

      // Catch Error
    } catch (error) {
      toast.error('Unable to Register your vote on the post.');
    }
  };

  // Returning UI based on status of app

  if (isLoading) {
    return <LoadingPage text="Loading Post..." />;
  }

  if (error.status) {
    toast.error(error.message);
    return <ContentNotFound text="Invalid Post Url. Post not found." />;
  }

  if (!post && !isLoading) {
    return <ContentNotFound text="Invalid Post Url. Post not found." />;
  }

  // Return JSX
  return (
    <main className="px-5 md:px-10 py-8 cursor-default bg-white rounded-xl  sm:mt-[2.15rem] relative min-h-[700px] overflow-y-scroll mx-3">
      <h1 className="text-green-900 text-xl sm:text-3xl font-extrabold">
        {post?.title}
      </h1>
      <Link
        href={`/user/profile/${post?.author_username}`}
        className="flex items-center font-bold hover:opacity-65 transition-opacity ease-in-out sm:hidden"
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
      {/* Define Post Stats Here */}
      <div className="w-full flex justify-between my-3">
        {/* User name, date created */}

        <Link
          href={`/user/profile/${post?.author_username}`}
          className="items-center font-bold hover:opacity-65 transition-opacity ease-in-out hidden sm:flex"
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

          <div className="sm:hidden">
            <DateComp time={post?.createdAt + ''} />
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <DateComp time={post?.createdAt + ''} />
      </div>

      {/* Separator */}
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
      {/* Section Divider */}
      <hr className="border-1 border-slate-400 opacity-70" />
      {/* Take Action on Post */}
      {status === 'authenticated' && (
        <div className="flex gap-3 mt-3">
          {/* Comment Button */}
          <PostAction
            onClick={() => setShowCommentBox(true)}
            title={'Comment'}
            bgColor="bg-orange-600"
          />
          {/* Upvote Post */}

          {
            // @ts-ignore
            !post?.upvotes.includes(user._id) && (
              <PostAction
                onClick={() => handlePostVote()}
                title={'UpVote'}
                bgColor="bg-green-600"
              />
            )
          }

          {/* DownVote Post */}
          {post && post.upvotes && post?.upvotes.includes(user._id) && (
            <PostAction
              onClick={() => handlePostVote()}
              title={'DownVote'}
              bgColor="bg-slate-700"
            />
          )}

          {/* Edit Post Post */}
          {user._id === post?.author && (
            <PostAction
              onClick={() => console.log('Trigger Upvote Post')}
              title={'Edit Post'}
              bgColor="bg-slate-400"
            />
          )}
        </div>
      )}
      {/* Section Divider */}
      <hr className="border-1 border-slate-400 opacity-70 my-3" />
      {/* Render all Comments for the Post  */}
      {post && (
        <CommentsComponent
          // @ts-ignore
          comments={post?.comments || []}
          currentUserId={status === 'authenticated' ? user._id : 'nil'}
        />
      )}

      {/* Post Comment*/}
      {showCommentBox && (
        <CommentOnPostComponent
          postId={post?._id}
          // @ts-ignore
          userId={user._id!}
          author_username={user.username}
          author_picture={user.profile_photo}
          postTitle={post?.title!}
          setShowCommentBox={setShowCommentBox}
          setRefreshPostPage={setRefreshPostPage}
        />
      )}
      {/* Toast */}
      <Toaster />
    </main>
  );
};

export default PostViewPage;
