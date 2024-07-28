'use client';

import { Editor } from '@tinymce/tinymce-react';
import FilePicker from './FilePicker';
import { useRef, useState } from 'react';
import commentOnPost from '@/actions/Posts/commentOnPost';
import toast from 'react-hot-toast';
import { FaWindowClose } from 'react-icons/fa';
import editPostAction from '@/actions/Posts/editPostAction';

/**
 * Comment on Post Post Page to be
 * rendered over current page
 */

type EditPostCompProp = {
  postId: string;
  postTitle: string;
  initialPostContent: string;
  setShowEditPostBox: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshPostPage: React.Dispatch<React.SetStateAction<number>>;
};

export type CommentDataType = {
  postId: string;
  userId: string;
  author_picture: string;
  author_username: string;
  commentText: string;
  picture1: string;
  picture2: string;
};

const EditPost: React.FC<EditPostCompProp> = ({
  postId,
  postTitle,
  initialPostContent = '',
  setShowEditPostBox,
  setRefreshPostPage,
}) => {
  // Define Component State here
  const [picture1, setPicture1] = useState('');
  const [picture2, setPicture2] = useState('');
  const [postContent, setPostContent] = useState(initialPostContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   Create reference for editor
  const editorRef = useRef(null);

  // Handle Update Add Comment to Post
  const handleSubmitEdit = async () => {
    // Handle mini validation
    if (postContent.trimEnd().length < 30) {
      toast.error(
        'A post less than 30 words is not so descriptive. Please add more words'
      );
      return;
    }
    // Begin submission
    setIsSubmitting(true);

    // Call Server action with the post to update and new content
    const response = await editPostAction(postId, postContent);
    const parsed = JSON.parse(response);

    if (parsed) {
      //   Refresh Component of parent state.
      setRefreshPostPage((prev) => ++prev);

      // Close Comment Box
      setIsSubmitting(false);
      setShowEditPostBox(false);
    } else {
      toast.error('An error occured. Please try again');
    }
  };

  //   Handler for updating comment text
  const handleEditorChange = (text: string, editor: Editor) => {
    setPostContent(text);
  };

  //   Return JSX
  return (
    <div className="w-full h-full fixed top-0 sm:top-[90px] left-0 p-5 pt-8 sm:px-[100px] bg-slate-200 backdrop-blur-lg bg-opacity-70 z-10 overflow-y-scroll">
      {/* Style Close Button */}
      <button
        onClick={() => setShowEditPostBox(false)}
        className="flex text-xs items-center gap-2 sm:text-xl"
      >
        <FaWindowClose
          className="text-red-400 bg-red-600 rounded-lg hover:opacity-50 cursor-pointer transitionopacity ease-in-out"
          fontSize={24}
        />{' '}
        Close
      </button>

      {/* JSX of the editor  */}
      <div className="md:mt-6 text-center w-full text-sm p-3">
        <h2 className=" sm:font-bold text-gray-700 text-sm">
          Editing Post Content:
        </h2>
        <p className="font-bold text-base">{postTitle}</p>
      </div>

      {/* Editing Form here */}
      <div className="w-full sm:[80%] sm:max-w-[800px] mx-auto">
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
          onInit={(_evt, editor) =>
            // @ts-ignore
            (editorRef.current = editor)
          }
          initialValue={initialPostContent}
          //@ts-ignore
          onEditorChange={handleEditorChange}
          id="tinymce_99883"
          init={{
            // id: '10',
            height: 380,
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'visualblocks',
              'codesample',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'emoticons',
            ],
            // undo redo
            toolbar:
              'blocks codesample emoticons bold italic forecolor ' +
              'alignleft aligncenter alignright alignjustify |' +
              'bullist numlist undo redo',
          }}
        />
      </div>

      {/* Custom File Pickers  */}
      <p className=" text-xs text-left ml-2 mt-3 sm:text-center">
        File Upload is Optional. Keep files under 2mb
      </p>
      <div className="flex gap-5 w-full p-2 overflow-x-hidden mb-3 sm:justify-center">
        <FilePicker
          setPictureUrl={setPicture1}
          buttonTitle="Select Picture 01"
        />
        <FilePicker
          setPictureUrl={setPicture2}
          buttonTitle="Select Picture 02"
        />
      </div>

      {/* Submit Comment */}
      <div className="w-full max-w-[800px] mx-auto">
        <button
          onClick={handleSubmitEdit}
          disabled={isSubmitting}
          className="w-full max-w-[800px] mx-auto bg-green-600 p-2 rounded-md uppercase font-bold text-slate-50 btn-general disabled:bg-gray-300 disabled:cursor-not-allowed transition ease-in-out"
        >
          {isSubmitting ? 'Please wait...' : 'Submit Changes'}
        </button>
      </div>
    </div>
  );
};

export default EditPost;
