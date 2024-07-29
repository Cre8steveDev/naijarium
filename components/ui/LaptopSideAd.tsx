import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LaptopAdPic from '@/public/images/laptop-ad.png';
import getSiteStats from '@/actions/getSiteStats';
import { SiteStat } from './MobileBottomAd';

const LaptopSideAd = () => {
  const [siteStats, setSiteStats] = useState<SiteStat>();
  const [loading, setLoading] = useState(true);

  // Useffect to load site stats
  useEffect(() => {
    getSiteStats().then((res: SiteStat) => {
      setSiteStats(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full sm:block hidden -mt-5">
      {!loading && (
        <>
          {' '}
          {siteStats && (
            <div className="p-2 bg-slate-300 dark:bg-slate-600 my-2 rounded-md text-sm text-center">
              <h3>
                Site Stats:{' '}
                <span className="font-bold">{siteStats.totalPosts} </span>Posts
                and <span className="font-bold"> {siteStats.totalUsers} </span>
                Users
              </h3>
            </div>
          )}
          <p className="text-xs ml-1 mb-2 text-slate-500">Sponsored Ads</p>
          <Image
            src={LaptopAdPic}
            alt="My Portfolio Ad"
            width={600}
            height={300}
            className="w-full object-cover overflow-hidden rounded-lg"
          />
        </>
      )}
    </div>
  );
};

export default LaptopSideAd;
