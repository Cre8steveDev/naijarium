'use client';

import { useFetchData } from '@/contexts/homepagecontext';
import { Dispatch, SetStateAction } from 'react';

type FilterButtonProps = {
  children: React.ReactNode;
  name: string;
  title: string;
  setPageNum: Dispatch<SetStateAction<number>>;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  name,
  title,
  setPageNum,
}) => {
  const contextValue = useFetchData();

  if (!contextValue) return null;

  const { filterFeed, setFilterFeed } = contextValue;

  return (
    <button
      className={`${
        filterFeed === name
          ? 'bg-green-800 hover:bg-white text-slate-100 hover:text-green-800'
          : 'bg-white hover:bg-green-600 text-green-800 hover:text-slate-100'
      } flex gap-2 items-center p-2 text-xs font-semibold transition rounded-md`}
      onClick={() => {
        setPageNum(1);
        setFilterFeed(name);
      }}
    >
      {children}
      {title}
    </button>
  );
};

export default FilterButton;
