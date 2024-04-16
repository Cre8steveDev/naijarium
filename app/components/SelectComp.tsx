'use client';
import React, { useState } from 'react';

const SelectComp = ({
  options,
  onClick,
}: {
  options: string[];
  onClick: (e: MouseEvent) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: string, e: MouseEvent) => {
    setSelectedOption(option);
    onClick(e);
  };

  return (
    <div className="relative inline-block">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.707 7.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 9.586V3a1 1 0 112 0v6.586l3.293-3.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SelectComp;
