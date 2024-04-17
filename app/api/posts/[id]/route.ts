import { NextApiRequest, NextApiResponse } from 'next';
import allPosts from '@/app/dummydata/dummyPostData';
import { NextResponse } from 'next/server';

async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  let { id } = params;
  const postId = parseInt(id);

  console.log('****************************************');
  console.log(id);
  console.log('****************************************');

  return NextResponse.json({
    post: allPosts.find((post) => post.postId === postId),
  });
}

export { GET };
