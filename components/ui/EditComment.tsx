'use client';

import { Editor } from '@tinymce/tinymce-react';
import FilePicker from './FilePicker';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaWindowClose } from 'react-icons/fa';
import editComment from '@/actions/Comments/editComment';
import { Comment } from '../CommentsComponent';

/**
 * Comment on Post Post Page to be
 * rendered over current page
 */

type EditCommentCompProp = {
  commentId: string;
  initialCommentContent: string;
  setShowEditCommentBox: React.Dispatch<React.SetStateAction<boolean>>;
  setThisComment: React.Dispatch<React.SetStateAction<Comment | null>>;
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

const EditComment: React.FC<EditCommentCompProp> = ({
  commentId,
  initialCommentContent = '',
  setShowEditCommentBox,
  setThisComment,
}) => {
  // Define Component State here
  const [picture1, setPicture1] = useState('');
  const [picture2, setPicture2] = useState('');
  const [commentContent, setCommentContent] = useState(initialCommentContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   Create reference for editor
  const editorRef = useRef(null);

  // Handle Update Add Comment to Post
  const handleSubmitEdit = async () => {
    // Handle mini validation
    if (commentContent.trimEnd().length < 30) {
      toast.error(
        'A comment less than 30 characters is not so descriptive. Please add more words'
      );
      return;
    }
    // Begin submission
    setIsSubmitting(true);

    // Call Server action with the post to update and new content
    const response = await editComment(
      commentId,
      commentContent,
      picture1,
      picture2
    );
    const parsed = await JSON.parse(response);

    if (parsed) {
      //   Refresh Component of parent state.
      setThisComment(parsed);

      // Close Comment Box
      setIsSubmitting(false);
      setShowEditCommentBox(false);
    } else {
      toast.error('An error occured. Please try again');
    }
  };

  //   Handler for updating comment text
  const handleEditorChange = (text: string, editor: Editor) => {
    setCommentContent(text);
  };

  //   Return JSX
  return (
    <div className="w-full h-full fixed top-0 sm:top-[90px] left-0 p-5 pt-8 sm:px-[100px] bg-slate-200 dark:bg-slate-700 backdrop-blur-lg bg-opacity-70 z-10 overflow-y-scroll">
      {/* Style Close Button */}
      <button
        onClick={() => setShowEditCommentBox(false)}
        className="flex text-xs items-center gap-2 sm:text-xl mt-[50px] sm:mt-0"
      >
        <FaWindowClose
          className="text-red-400 bg-red-600 rounded-lg hover:opacity-50 cursor-pointer transitionopacity ease-in-out"
          fontSize={24}
        />{' '}
        Close
      </button>

      {/* JSX of the editor  */}
      <div className="md:mt-6 text-center w-full text-sm p-3 mt-1">
        <h2 className="font-bold text-gray-700 dark:text-slate-100 text-xl">
          Edit the Comment:
        </h2>
      </div>

      {/* Editing Form here */}
      <div className="w-full sm:[80%] max-w-[800px] mx-auto">
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
          onInit={(_evt, editor) =>
            // @ts-ignore
            (editorRef.current = editor)
          }
          initialValue={initialCommentContent}
          //@ts-ignore
          onEditorChange={handleEditorChange}
          id="tinymce_99883"
          init={{
            // id: '10',
            height: 400,
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
      <p className=" text-xs text-left ml-2 dark:text-white">
        File Upload is Optional. Keep files under 2mb
      </p>
      <div className="flex gap-5 w-full p-2 overflow-x-hidden">
        <FilePicker
          setPictureUrl={setPicture1}
          buttonTitle={
            picture1 === '' ? 'Select Picture 01' : 'Change picture 01'
          }
        />
        <FilePicker
          setPictureUrl={setPicture2}
          buttonTitle={
            picture2 === '' ? 'Select Picture 02' : 'Change picture 02'
          }
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

export default EditComment;
