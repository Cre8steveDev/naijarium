import React from 'react';
import LoaderIcon from '@/public/images/loading_image.gif';
import Image from 'next/image';

const LoadingPage = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-full justify-center items-center flex flex-col gap-3">
      <Image
        src={LoaderIcon}
        width={40}
        height={40}
        alt="Loader..."
        className="w-full max-w-[200px]"
      />
      <p>{text}</p>
    </div>
  );
};

export default LoadingPage;
