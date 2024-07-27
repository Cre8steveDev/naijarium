import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const DateComp = ({ time }: { time: string }) => {
  // Function that prettifies the time
  function formatRelativeTime(isoDateString: string) {
    const date = parseISO(isoDateString);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  const relativeTime = formatRelativeTime(time);

  //   Return JSX
  return (
    <div className="bg-slate-200 p-1 px-2 text-black text-[10px] sm:text-[14px] rounded-lg">
      <p>{relativeTime}</p>
    </div>
  );
};

export default DateComp;
