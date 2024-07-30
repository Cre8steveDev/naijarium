import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function POST() {
  const timestamp = Math.round(new Date().getTime() / 1000);

  try {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      },
      process.env.CLOUDINARY_API_SECRET as string
    );
    // timestamp,
    return NextResponse.json({
      signature,
      timestamp,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    return NextResponse.json({ error: 'An Error occurred' }, { status: 500 });
  }
}
