import React from 'react';
import MobileAdPic from '@/public/images/mobile-ad.png';
import Image from 'next/image';

/**
 * Mobile Bottom Ad Component
 */
const MobileBottomAd = () => {
  return (
    <div className="w-full sm:hidden -mt-[50px] p-1 mb-4">
      <p className="text-xs ml-1 mb-2 text-slate-500">Sponsored Ads</p>
      <Image
        src={MobileAdPic}
        alt="My Portfolio Ad"
        width={600}
        height={300}
        className="w-full object-cover overflow-hidden rounded-lg"
      />
    </div>
  );
};

export default MobileBottomAd;
