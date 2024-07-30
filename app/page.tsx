'use client';

import FilterButton from '../components/ui/FilterButton';
import FilterHomePageDataContext from '../contexts/homepagecontext';

import { IoNewspaperOutline } from 'react-icons/io5';
import { useState, useEffect, useRef, useMemo } from 'react';

import FeaturedPostCard from '../components/FeaturedPostCard';
import { IPost } from '@/database/models.types';
import fetchFrontPageWithFilters from '@/actions/fetchFrontPageWithFilters';
import toast from 'react-hot-toast';
import LoadingPage from '@/components/ui/LoadingPage';
import ContentNotFound from '@/components/ui/ContentNotFound';
import MobileBottomAd from '@/components/ui/MobileBottomAd';

export default function Home() {
  const [filterFeed, setFilterFeed] = useState('featured');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [frontPagePosts, setFrontPagePosts] = useState<IPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<IPost[]>([]);

  const [loadingFeed, setLoadingFeed] = useState(true);
  const [errorLoadingFeed, setErrorLoadingFeed] = useState(false);

  const postContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    //  Set Up Page State
    setErrorLoadingFeed(false);

    console.log('Filter typed changed: ', filterFeed);

    // Begin Data Fetching
    try {
      fetchFrontPageWithFilters(filterFeed, pageNumber).then((response) => {
        if (!response) throw new Error('Error Fetching Data');

        // Set the page content
        setFrontPagePosts(response.data);
        setTotalPosts(response.totalPosts);
        console.log(response.data);
      });
    } catch (error: any & { message: string }) {
      toast.error(error?.message!);
      setErrorLoadingFeed(true);
    } finally {
      setLoadingFeed(false);
    }

    // End of Data Fetching
  }, [filterFeed, pageNumber]);

  // Scroll to top when next/prev page via pagination
  useEffect(() => {
    if (postContainerRef.current) {
      const container = postContainerRef.current;
      container.scrollTo(0, 0);
    }

    // return clearInterval(timeout);
  }, [frontPagePosts]);

  // Fixing performance issue of rendering too many cards at once
  // Was causing slow time in first contentful paint of featured posts
  useEffect(() => {
    if (frontPagePosts) {
      setDisplayedPosts([]);
      const loadPosts = async () => {
        for (let i = 0; i < frontPagePosts.length; i += 4) {
          setDisplayedPosts((prev) => [
            ...prev,
            ...frontPagePosts.slice(i, i + 4),
          ]);
          await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay between batches
        }
      };
      loadPosts();
    }
  }, [frontPagePosts, filterFeed, pageNumber]);

  // Return JSX UI Component
  return (
    <FilterHomePageDataContext.Provider value={{ filterFeed, setFilterFeed }}>
      <main className="px-5 sm:p-8 ">
        <section className="flex justify-center md:justify-start gap-3 sm:mt-2 sm:mb-4 mb-2">
          <FilterButton
            name="featured"
            title="FEATURED"
            setPageNum={setPageNumber}
          >
            <IoNewspaperOutline className="hover:text-green-800" />
          </FilterButton>

          <FilterButton
            name="new"
            title="NEW TOPICS"
            setPageNum={setPageNumber}
          >
            <IoNewspaperOutline className="hover:text-green-800" />
          </FilterButton>

          <FilterButton
            name="favourite"
            title="FAVOURITE"
            setPageNum={setPageNumber}
          >
            <IoNewspaperOutline className="hover:text-green-800" />
          </FilterButton>
        </section>

        <section className="overflow-y-scroll h-screen" ref={postContainerRef}>
          {/* Define main body */}
          {loadingFeed && <LoadingPage text="Loading Feed..." />}

          {errorLoadingFeed && (
            <ContentNotFound text="There was an error loading feed.." />
          )}

          {/* Map Through the Returned Posts and Render on the UI */}
          {displayedPosts &&
            displayedPosts.map((post, index) => (
              <FeaturedPostCard
                key={String(post._id) + String(index)}
                post={post}
                index={index}
              />
            ))}

          {/* End of the Posts Card Rendering  */}

          {/* Pagination Button Begins Here*/}
          {frontPagePosts.length > 1 && (
            <section className="flex justify-between md:mb-10 h-[120px] text-sm">
              <p className="bg-gray-300 p-2 rounded-lg w-[100px] font-bold text-center text-gray-600 text-md cursor-default self-start">
                {totalPosts + ' Posts'}
              </p>
              <div className="flex items-center gap-2 self-start">
                <button
                  disabled={pageNumber === 1}
                  onClick={() => setPageNumber((prev) => --prev)}
                  className={`bg-orange-500 p-2 rounded-lg text-white disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  Previous
                </button>
                <p className="bg-green-400 p-2 rounded-lg w-[35px] text-center text-white">
                  {pageNumber}
                </p>
                <button
                  disabled={pageNumber * 15 > totalPosts}
                  onClick={() => setPageNumber((prev) => ++prev)}
                  className={`bg-orange-500 p-2 rounded-lg text-white disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  Next
                </button>
              </div>
            </section>
          )}

          {/* Pagination Button Ends Here */}
          <MobileBottomAd />
        </section>
      </main>
    </FilterHomePageDataContext.Provider>
  );
}
