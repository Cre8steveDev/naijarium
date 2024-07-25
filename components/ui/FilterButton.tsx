'use client';

import { useFetchData } from '@/contexts/homepagecontext';
import { Dispatch, SetStateAction } from 'react';

type FilterButtonProps = {
  children: React.ReactNode;
  name: string;
  title: string;
  setPageNum: Dispatch<SetStateAction<number>>;
  subPageFilter?: Dispatch<SetStateAction<string>>;
  subPageFilterValue?: string;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  name,
  title,
  setPageNum,
  subPageFilter,
  subPageFilterValue,
}) => {
  const contextValue = useFetchData();
  let newFilterFeed: string;
  let newSetFilterFeed: Dispatch<SetStateAction<string>>;

  if (contextValue) {
    const { filterFeed, setFilterFeed } = contextValue;
    newFilterFeed = filterFeed;
    newSetFilterFeed = setFilterFeed;
  } else {
    newFilterFeed = subPageFilterValue!;
    newSetFilterFeed = subPageFilter!;
  }

  return (
    <button
      className={`${
        newFilterFeed === name
          ? 'bg-green-800 hover:bg-white text-slate-100 hover:text-green-800'
          : 'bg-white hover:bg-green-600 text-green-800 hover:text-slate-100'
      } flex gap-1 sm:gap-2 items-center p-2 text-[10px] sm:text-xs font-semibold transition rounded-md`}
      onClick={() => {
        setPageNum(1);

        if (!subPageFilter) newSetFilterFeed(name);
        else subPageFilter(name);
      }}
    >
      <div>{children}</div>
      {title}
    </button>
  );
};

export default FilterButton;
