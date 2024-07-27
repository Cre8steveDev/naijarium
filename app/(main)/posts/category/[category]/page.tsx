'use client';

import FilterButton from '@/components/ui/FilterButton';

import { IoNewspaperOutline } from 'react-icons/io5';
import { useState, useEffect, LegacyRef, useRef } from 'react';

import FeaturedPostCard from '@/components/FeaturedPostCard';
import fetchCategoryPageWithFilters from '@/actions/fetchCategoryPageWithFilters';

import { IPost } from '@/database/models.types';

import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

export default function PostCategoryPage() {
  const { category } = useParams();

  const [filterFeed, setFilterFeed] = useState('new');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [categoryPagePosts, setCategoryPagePosts] = useState<IPost[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [errorLoadingFeed, setErrorLoadingFeed] = useState(false);

  const postContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    //  Set Up Page State
    setErrorLoadingFeed(false);

    // Begin Data Fetching
    try {
      fetchCategoryPageWithFilters(category + '', filterFeed, pageNumber).then(
        (response) => {
          if (!response) throw new Error('Error Fetching Data');

          // Set the page content
          setCategoryPagePosts(response.data);
          setTotalPosts(response.totalPosts);
        }
      );
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
    let timeout;
    if (postContainerRef.current) {
      const container = postContainerRef.current;
      container.scrollTo(0, 0);
    }

    // return clearInterval(timeout);
  }, [categoryPagePosts]);

  return (
    <main className="px-5 sm:p-8 h-[calc(100%-100px)]">
      <section className="flex justify-center md:justify-start gap-3 mt-2 mb-4">
        <FilterButton
          name="new"
          title="NEW TOPICS"
          setPageNum={setPageNumber}
          subPageFilter={setFilterFeed}
          subPageFilterValue={filterFeed}
        >
          <IoNewspaperOutline className="hover:text-green-800" />
        </FilterButton>

        <FilterButton
          name="favourite"
          title="FAVOURITE"
          setPageNum={setPageNumber}
          subPageFilter={setFilterFeed}
          subPageFilterValue={filterFeed}
        >
          <IoNewspaperOutline className="hover:text-green-800" />
        </FilterButton>
      </section>

      <section className="h-full overflow-y-scroll" ref={postContainerRef}>
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
        {categoryPagePosts &&
          categoryPagePosts.map((post, index) => (
            <FeaturedPostCard
              key={String(post._id)}
              post={post}
              index={index}
            />
          ))}

        {/* End of the Posts Card Rendering  */}

        {/* Pagination Button Begins Here*/}
        {categoryPagePosts.length > 1 && (
          <section className="flex justify-between mb-10 h-[120px] text-sm">
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
      </section>
    </main>
  );
}
