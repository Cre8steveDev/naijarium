'use client';
/**
 * Side Bar Navigation for visiting other
 * Posts based on Category
 *
 */
import { postsCategoryNavLinks } from '@/constants/categoriesAndRoutes';

import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Link from 'next/link';

const SideBarNavigation = () => {
  const router = useRouter();

  const handleOptionChange = (value: string) => {
    router.push(`${value}`);
  };

  return (
    <div className="bg-orange-400 p-2 rounded-lg">
      <p className="font-semibold text-white text-sm p-2">
        Explore Other Categories
      </p>
      <Select onValueChange={handleOptionChange}>
        <SelectTrigger className="w-full text-[16px] focus:outline-none focus:border-none">
          <SelectValue placeholder="Navigate To:" />
        </SelectTrigger>
        <SelectContent>
          {postsCategoryNavLinks.map((category, idx) => (
            <SelectItem
              key={idx}
              value={category.route}
              className="cursor-pointer"
            >
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SideBarNavigation;
