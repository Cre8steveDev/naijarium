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
  });
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
