import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const FilterHomePageDataContext = createContext<{
  filterFeed: string;
  setFilterFeed: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

// A custom hook to use this context
export const useFetchData = () => useContext(FilterHomePageDataContext);

export default FilterHomePageDataContext;
