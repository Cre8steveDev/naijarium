import React from 'react';
import { useFilePicker } from 'use-file-picker';
import { FaFileImage } from 'react-icons/fa';

type TFilePicker = {
  setPictureUrl: React.Dispatch<React.SetStateAction<string>>;
  buttonTitle?: string;
};

export default function FilePicker({
  setPictureUrl,
  buttonTitle = 'Select File',
}: TFilePicker) {
  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: 'image/*',
    multiple: false,
    onFilesRejected: ({ errors }) => {
      // this callback is called when there were validation errors
    },
    //@ts-ignore
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      handleUploadPicture();
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle upload to cloud and setPictureURL
  const handleUploadPicture = () => {};

  return (
    <div className="truncate overflow-x-hidden">
      <button
        onClick={(e) => {
          e.preventDefault();
          openFilePicker();
        }}
      >
        {filesContent[0] ? (
          <div className="flex gap-2 p-2 items-center bg-gray-300 rounded-md">
            <p>{filesContent[0]?.name}</p>
          </div>
        ) : (
          <div className="flex gap-2 p-2 items-center bg-gray-300 rounded-md">
            <FaFileImage className="" />{' '}
            <p className="text-xs sm:text-base">{buttonTitle}</p>
          </div>
        )}
      </button>
      <br />
    </div>
  );
}
