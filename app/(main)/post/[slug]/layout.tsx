import { Metadata } from 'next';
import { generateMetadata as baseGenerateMetadata } from '@/components/seo/PageSEO';
import { fetchSinglePost } from '@/lib/fetchSinglePost';
import { stripHtmlTags } from '../../../../lib/utils';

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch the post data using the slug
  const post = await fetchSinglePost(params.slug);

  if (!post) {
    return baseGenerateMetadata({
      title: 'Post Not Found | Naijarium',
    });
  }

  // Generate the metadata using the fetched post data
  return baseGenerateMetadata({
    title: post.title!,
    description: ` Created by: ${post.author_username} - ${stripHtmlTags(
      post.content!
    ).slice(0, 150)} + "...Read More`,
    ogImage:
      post.post_picture1 && post.post_picture1 !== ''
        ? post.post_picture1?.replace('upload', 'upload/c_fill,w_1200,h_630')
        : 'https://res.cloudinary.com/dg0qc5gkl/image/upload/v1722329485/naijarium-og-image_q0nrzo.png',
  });
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
