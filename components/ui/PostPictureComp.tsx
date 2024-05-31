import React, { SetStateAction } from 'react';
import Image from 'next/image';

type PostPictureCompProp = {
  picture_url: string;
  author_username: string;
  setSelectedPicture: React.Dispatch<SetStateAction<string>>;
};

const PostPictureComp = ({
  picture_url,
  author_username,
  setSelectedPicture,
}: PostPictureCompProp) => {
  return (
    <div
      className="w-full rounded-lg"
      onClick={() => setSelectedPicture(picture_url)}
    >
      <Image
        src={picture_url}
        alt={author_username || 'Picture One'}
        className="w-full"
      />
    </div>
  );
};

export default PostPictureComp;
