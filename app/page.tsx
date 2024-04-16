'use client';

import Image from 'next/image';
import FilterButton from './components/ui/FilterButton';
import FetchDataContext from './contexts/homepagecontext';

import { IoNewspaperOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function Home() {
  const [filterFeed, setFilterFeed] = useState('new');

  return (
    <FetchDataContext.Provider value={{ filterFeed, setFilterFeed }}>
      <main className="px-5 py-8">
        <section className="flex gap-3 mt-3">
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

        {/* Define main body */}
        <section></section>
      </main>
    </FetchDataContext.Provider>
  );
}
