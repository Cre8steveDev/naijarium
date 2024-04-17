'use client';

import Image from 'next/image';
import FilterButton from './components/ui/FilterButton';
import FetchDataContext from './contexts/homepagecontext';

import { IoNewspaperOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { TPost } from './dummydata/dummyPostData';
import Link from 'next/link';
import { fetchFeaturedPosts } from './lib/fetchFeaturedPosts';
import FeaturedPostCard from './components/FeaturedPostCard';

export default function Home() {
  const [filterFeed, setFilterFeed] = useState('new');
  const [featuredPosts, setFeaturedPosts] = useState<TPost[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [errorLoadingFeed, setErrorLoadingFeed] = useState(false);
  const [postsNotAvailable, setPostsNotAvailable] = useState(false);

  useEffect(() => {
    setLoadingFeed(true);
    try {
      fetchFeaturedPosts(filterFeed).then((allPosts) => {
        setFeaturedPosts(allPosts);
      });
      setLoadingFeed(false);
    } catch (error) {
      setErrorLoadingFeed(true);
    }
  }, [filterFeed]);

  return (
    <FetchDataContext.Provider value={{ filterFeed, setFilterFeed }}>
      <main className="px-5 py-8">
        <section className="flex gap-3 mt-2 mb-4">
          <FilterButton name="new" title="NEW">
            <IoNewspaperOutline className="hover:text-green-800" />
          </FilterButton>

          <FilterButton name="hot" title="HOT">
            <IoNewspaperOutline className="hover:text-green-800" />
          </FilterButton>

          <FilterButton name="favourite" title="FAVOURITE">
            <IoNewspaperOutline className="hover:text-green-800" />
          </FilterButton>
        </section>

        <section>
          {/* Define main body */}
          {loadingFeed && (
            <div className="h-[80%] p-16">
              <h1>Loading Posts...</h1>
            </div>
          )}
          {errorLoadingFeed && (
            <div className="h-[80%] p-16">
              <h1>Sorry, there was an error loading the feed...</h1>
            </div>
          )}

          {featuredPosts &&
            featuredPosts.map((post) => (
              <FeaturedPostCard key={post.postId} post={post} />
            ))}
        </section>
        <section className="h-[120px]"></section>
      </main>
    </FetchDataContext.Provider>
  );
}
