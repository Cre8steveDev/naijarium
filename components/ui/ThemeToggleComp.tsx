'use client';

import { useTheme } from '@/contexts/ThemeProvider';
import { LuLightbulb, LuLightbulbOff } from 'react-icons/lu';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title="Toggle Theme"
      className="px-2 sm:px-4 py-2 sm:py-4 rounded-lg dark:bg-gray-200 bg-gray-800 dark:text-gray-800 text-gray-200"
    >
      {theme === 'dark' ? <LuLightbulb /> : <LuLightbulbOff />}
    </button>
  );
}
