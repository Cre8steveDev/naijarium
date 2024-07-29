'use server';

import connectDB from '@/database/connection';
import { User, Post } from '@/database/models';
import { SiteStat } from '@/components/ui/MobileBottomAd';

async function getSiteStats(): Promise<SiteStat> {
  try {
    // Connect to Database
    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();

    const result = { totalPosts, totalUsers };

    // return JSON.stringify(result);
    return result;
  } catch (error) {
    // return JSON.stringify(null);
    return undefined;
  }
}

export default getSiteStats;
