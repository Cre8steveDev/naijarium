import React, { SetStateAction } from 'react';
import Image from 'next/image';

type PostPictureCompProp = {
  picture_url: string;
  author_username: string;
  setSelectedPicture: React.Dispatch<SetStateAction<string>>;
  type?: 'comment' | 'post';
};

const PostPictureComp = ({
  picture_url,
  author_username,
  setSelectedPicture,
  type = 'post',
}: PostPictureCompProp) => {
  // Return Interactive JSX Component
  return (
    <div className="relative w-full rounded-lg p-3 md:h-[200px] md:overflow-hidden md:object-contain">
      <div
        onClick={() => setSelectedPicture(picture_url)}
        className={`z-5 absolute left-0 top-0 h-full w-full cursor-pointer items-center justify-center bg-slate-700 font-bold text-white opacity-0 transition-all duration-300 ease-in hover:opacity-70 ${
          type === 'post' ? 'md:flex hidden' : 'flex'
        }`}
      >
        <p>Click to Preview</p>
      </div>

      <img
        src={picture_url}
        alt={author_username || 'Picture One'}
        className="w-full overflow-hidden rounded-lg shadow-lg shadow-slate-300 md:h-full md:object-contain"
      />
    </div>
  );
};

export default PostPictureComp;
