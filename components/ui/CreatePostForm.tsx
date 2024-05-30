'use client';

/** CreatePost Form
 *
 * @returns JSX Element
 */

import { Editor } from '@tinymce/tinymce-react';
import toast, { Toaster } from 'react-hot-toast';

import { useRef, useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import FilePicker from './FilePicker';

import axios from 'axios';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IUser } from '@/database/models.types';

type TFormData = {
  category: string;
  title: string;
  author_id?: string;
  author_picture?: string;
  author_username?: string;
  post_content?: string;
  post_picture1?: string;
  post_picture2?: string;
};

const categoryList = [
  'Artificial Intelligence',
  'Business',
  'Crime',
  'Education',
  'Environment',
  'Family/Marriage',
  'Jobs/Vacancies',
  'Politics',
  'Programming',
  'Romance',
  'Science',
  'Self-Improvement',
  'Travel/Tourism',
];

const CreatePostForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TFormData>();
  const editorRef = useRef(null);
  const mode = 'dark';
  const [picture1, setPicture1] = useState('');
  const [picture2, setPicture2] = useState('');

  const { data } = useSession();
  const router = useRouter();

  const user = data?.user as IUser;

  const handleEditorChange = (a: string, editor: Editor) => {
    setValue('post_content', a);
  };

  const onFormSubmit = async (formData: TFormData) => {
    if (!formData.category)
      return toast.error('Please select a category for your post');

    formData['post_picture1'] = picture1;
    formData['post_picture2'] = picture2;
    formData['author_id'] = String(user?._id!);
    formData['author_username'] = user?.username;
    formData['author_picture'] = user?.profile_photo;

    try {
      const response = await axios.post('/api/posts/create', formData);

      toast.success(response.data.message);
      setTimeout(() => router.back(), 2000);
    } catch (error) {
      console.log(error);
      //@ts-ignore
      toast.error(error?.response?.data?.message || error.message);
    } finally {
    }
  };

  const handleFormErrors: SubmitErrorHandler<TFormData> = (error) => {
    if (error.title)
      return toast.error(
        'Please enter a valid title for your post. Must be between 40 - 120 characters'
      );

    if (error.category)
      return toast.error('Please select a category for your post');

    if (error.post_content)
      return toast.error('Please, the content field is required. 😊');
  };

  //   Define the form JSX
  return (
    <form
      className="w-full p-3 flex flex-col gap-3 text-gray-700"
      onSubmit={handleSubmit(onFormSubmit, handleFormErrors)}
    >
      <input
        placeholder="Enter a Descriptive Title for your Post"
        maxLength={120}
        minLength={40}
        className="w-full p-3 rounded-lg text-[16px] focus:outline-none"
        type="text"
        {...register('title', { required: true, minLength: 40 })}
      />

      <Select
        // {...register('category', { required: true })}
        onValueChange={(value) => setValue('category', value)}
      >
        <SelectTrigger className="w-full text-[16px] focus:outline-none focus:border-none">
          <SelectValue placeholder="Select Post Category" />
        </SelectTrigger>
        <SelectContent>
          {categoryList.map((category, idx) => (
            <SelectItem key={idx} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full">
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
          onInit={(_evt, editor) =>
            // @ts-ignore
            (editorRef.current = editor)
          }
          initialValue=""
          //@ts-ignore
          onEditorChange={handleEditorChange}
          id="tinymce_99883"
          {...register('post_content', { required: true, minLength: 20 })}
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
              'blocks | codesample emoticons | ' +
              'bold italic | forecolor |' +
              'alignleft aligncenter ' +
              'alignright | alignjustify | bullist numlist',
            // content_style: 'body { font-family:Inter; font-size:16px }',
            //   skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
            //   content_css: mode === 'dark' ? 'dark' : 'light',
          }}
        />
      </div>

      {/* Custom File Pickers  */}
      <p className=" text-xs text-left ml-2">
        File Upload is Optional. Keep files under 2mb
      </p>
      <div className="flex gap-5 w-full p-2 overflow-x-hidden">
        <FilePicker
          setPictureUrl={setPicture1}
          buttonTitle="Select Picture 01"
        />
        <FilePicker
          setPictureUrl={setPicture2}
          buttonTitle="Select Picture 02"
        />
      </div>
      {/* End Custom File Pickers */}

      {/* Submit Form */}
      <button
        disabled={isSubmitting}
        className="w-full bg-orange-600 p-4 rounded-md uppercase font-bold text-slate-50 btn-general disabled:bg-gray-300 disabled:cursor-not-allowed transition ease-in-out"
      >
        Submit Post
      </button>
      <Toaster />
    </form>
  );
};

export default CreatePostForm;
