'use client';

import React, { useCallback, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { FaFileImage } from 'react-icons/fa';
import { CldUploadWidget } from 'next-cloudinary';
import toast from 'react-hot-toast';

type TFilePicker = {
  setPictureUrl: React.Dispatch<React.SetStateAction<string>>;
  buttonTitle?: string;
};

export default function FilePicker({
  setPictureUrl,
  buttonTitle = 'Select File',
}: TFilePicker) {
  // Define State
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle upload to cloud and setPictureURL
  const handleUploadSuccess = (result: any) => {
    setPictureUrl(result.info.secure_url);
    setUploadedImageUrl(result.info.secure_url);
    toast.success('Image Uploaded.');
  };

  return (
    <div>
      <CldUploadWidget
        uploadPreset="gm2rxjpu"
        onSuccess={handleUploadSuccess}
        onError={() => toast.error('Error uploading Photo.')}
        options={{
          maxFiles: 1,
          maxFileSize: 2000000, // 2MB
          sources: ['local', 'url', 'camera'],
        }}
      >
        {({ open }) => (
          <button
            className="bg-slate-700 p-1 rounded-md text-white dark:bg-slate-200 dark:text-black text-xs sm:text-base"
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
          >
            {buttonTitle}
          </button>
        )}
      </CldUploadWidget>

      {uploadedImageUrl !== '' && (
        <div className="w-[150px] h-[150px] max-h-[150px] object-contain overflow-hidden rounded-md mt-1">
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            className="w-full object-contain h-full"
          />
        </div>
      )}
    </div>
  );
}

// Old Implementation with useFile Picker

// import React from 'react';
// import { useFilePicker } from 'use-file-picker';
// import { FaFileImage } from 'react-icons/fa';

// type TFilePicker = {
//   setPictureUrl: React.Dispatch<React.SetStateAction<string>>;
//   buttonTitle?: string;
// };

// export default function FilePicker({
//   setPictureUrl,
//   buttonTitle = 'Select File',
// }: TFilePicker) {
//   const { openFilePicker, filesContent, loading } = useFilePicker({
//     accept: 'image/*',
//     multiple: false,
//     onFilesRejected: ({ errors }) => {
//       // this callback is called when there were validation errors
//     },
//     //@ts-ignore
//     onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
//       handleUploadPicture();
//     },
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Handle upload to cloud and setPictureURL
//   const handleUploadPicture = () => {};

//   return (
//     <div className="truncate overflow-x-hidden">
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           openFilePicker();
//         }}
//       >
//         {filesContent[0] ? (
//           <div className="flex gap-2 p-2 items-center bg-gray-300 dark:bg-slate-800 rounded-md">
//             <p className="text-xs sm:text-base dark:text-white">
//               {filesContent[0]?.name}
//             </p>
//           </div>
//         ) : (
//           <div className="flex gap-2 p-2 items-center bg-gray-300 dark:bg-slate-800 rounded-md">
//             <FaFileImage className="dark:text-white" />{' '}
//             <p className="text-xs sm:text-base dark:text-white">
//               {buttonTitle}
//             </p>
//           </div>
//         )}
//       </button>
//       <br />
//     </div>
//   );
// }
