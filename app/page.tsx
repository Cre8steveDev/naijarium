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
import toast from 'react-hot-toast';

export default function Home() {
  const [filterFeed, setFilterFeed] = useState('featured');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [frontPagePosts, setFrontPagePosts] = useState<IPost[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [errorLoadingFeed, setErrorLoadingFeed] = useState(false);
  // const [postsNotAvailable, setPostsNotAvailable] = useState(false);

  useEffect(() => {
    //  Set Up Page State
    setErrorLoadingFeed(false);

    // Begin Data Fetching
    try {
      fetchFrontPageWithFilters(filterFeed, pageNumber).then((response) => {
        if (!response) throw new Error('Error Fetching Data');

        // Set the page content
        setFrontPagePosts(response.data);
        setTotalPosts(response.totalPosts);
      });
    } catch (error: any & { message: string }) {
      toast.error(error?.message!);
      setErrorLoadingFeed(true);
    } finally {
      setLoadingFeed(false);
    }

    // End of Data Fetching
  }, [filterFeed, pageNumber]);

  return (
    <FilterHomePageDataContext.Provider value={{ filterFeed, setFilterFeed }}>
      <main className="px-5 sm:p-8">
        <section className="flex gap-3 mt-2 mb-4 justify-center md:justify-start">
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

        <section className="h-full">
          {/* Define main body */}
          {loadingFeed && (
            <div className="p-16 h-[80%]">
              <h1>Loading Posts...</h1>
            </div>
          )}
          {errorLoadingFeed && (
            <div className="p-16 h-[80%]">
              <h1>Sorry, there was an error loading the feed...</h1>
            </div>
          )}

          {/* Map Through the Returned Posts and Render on the UI */}
          {frontPagePosts &&
            frontPagePosts.map((post) => (
              <FeaturedPostCard key={String(post._id)} post={post} />
            ))}
        </section>

        {/* End of the Posts Card Rendering  */}

        {/* Pagination Button Begins Here*/}
        <section className="flex justify-between mb-4 h-[120px]">
          <p className="bg-gray-300 p-2 rounded-lg w-[100px] font-bold text-center text-gray-600 text-md cursor-default self-start">
            {totalPosts + ' Posts'}
          </p>
          <div className="flex gap-2 self-start items-center">
            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((prev) => --prev)}
              className={`bg-orange-500 text-sm p-2 rounded-lg text-white disabled:bg-gray-300 disabled:cursor-not-allowed`}
            >
              Previous
            </button>
            <p className="bg-green-400 text-sm w-[35px] text-center text-white p-2 rounded-lg">
              {pageNumber}
            </p>
            <button
              disabled={pageNumber * 15 > totalPosts}
              onClick={() => setPageNumber((prev) => ++prev)}
              className={`bg-orange-500 text-sm p-2 rounded-lg text-white disabled:bg-gray-300 disabled:cursor-not-allowed`}
            >
              Previous
            </button>
          </div>
        </section>

        {/* Pagination Button Ends Here */}
      </main>
    </FilterHomePageDataContext.Provider>
  );
}
