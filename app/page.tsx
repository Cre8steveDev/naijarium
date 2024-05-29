'use client';

import Image from 'next/image';
import FilterButton from '../components/ui/FilterButton';
import FilterHomePageDataContext from '../contexts/homepagecontext';

import { IoNewspaperOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchFeaturedPosts } from '../lib/fetchFeaturedPosts';
import FeaturedPostCard from '../components/FeaturedPostCard';
import { IPost } from '@/database/models.types';
import fetchFrontPageWithFilters from '@/actions/fetchFrontPageWithFilters';

export default function Home() {
  const [filterFeed, setFilterFeed] = useState('featured');
  const [pageNumber, setPageNumber] = useState(1);
  const [frontPagePosts, setFrontPagePosts] = useState<IPost[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [errorLoadingFeed, setErrorLoadingFeed] = useState(false);
  // const [postsNotAvailable, setPostsNotAvailable] = useState(false);

  useEffect(() => {
    setLoadingFeed(true);

    // Begin Data Fetching
    try {
      fetchFrontPageWithFilters(filterFeed, pageNumber).then((response) => {
        console.log(response);
      });

      // setFrontPagePosts(currentpagePosts);
      setLoadingFeed(false);
    } catch (error) {
      setErrorLoadingFeed(true);
    }
  }, [filterFeed]);

  return (
    <FilterHomePageDataContext.Provider value={{ filterFeed, setFilterFeed }}>
      <main className="px-5 py-8">
        <section className="flex gap-3 mt-2 mb-4">
          <FilterButton name="featured" title="FEATURED">
            <IoNewspaperOutline className="hover:text-green-800" />
          </FilterButton>

          <FilterButton name="new" title="NEW TOPICS">
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

          {frontPagePosts &&
            frontPagePosts.map((post) => (
              <FeaturedPostCard key={post._id} post={post} />
            ))}
        </section>
        <section className="h-[120px]"></section>
      </main>
    </FilterHomePageDataContext.Provider>
  );
}
