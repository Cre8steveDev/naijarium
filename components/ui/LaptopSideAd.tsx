import React from 'react';
import Image from 'next/image';
import LaptopAdPic from '@/public/images/laptop-ad.png';

const LaptopSideAd = () => {
  return (
    <div className="w-full sm:block hidden">
      <p className="text-xs ml-1 mb-2 text-slate-500">Sponsored Ads</p>
      <Image
        src={LaptopAdPic}
        alt="My Portfolio Ad"
        width={600}
        height={300}
        className="w-full object-cover overflow-hidden rounded-lg"
      />
    </div>
  );
};

export default LaptopSideAd;
