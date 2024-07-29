import React, { useEffect, useState } from 'react';
import MobileAdPic from '@/public/images/mobile-ad.png';
import Image from 'next/image';
import getSiteStats from '@/actions/getSiteStats';

/**
 * Mobile Bottom Ad Component
 */
export type SiteStat = { totalPosts: number; totalUsers: number } | undefined;

const MobileBottomAd = () => {
  const [siteStats, setSiteStats] = useState<SiteStat>();
  const [loading, setLoading] = useState(true);

  // Useffect to load site stats
  useEffect(() => {
    getSiteStats().then((res: SiteStat) => {
      setSiteStats(res);
      setLoading(false);
    });
  }, []);

  // Return JSX To Client
  return (
    <div className="w-full sm:hidden -mt-[50px] p-1 mb-4">
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
            src={MobileAdPic}
            alt="My Portfolio Ad"
            width={600}
            height={300}
            className="w-full object-cover overflow-hidden rounded-lg"
          />{' '}
        </>
      )}
    </div>
  );
};

export default MobileBottomAd;
