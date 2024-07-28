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

const SideBarNavigation = ({
  setShowMobileMenu,
  setSelectOpen,
}: {
  setShowMobileMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const handleOptionChange = (value: string) => {
    if (setShowMobileMenu) setShowMobileMenu(false);

    // Route to the page
    router.push(`/posts/category/${value}`);
  };

  return (
    <div
      className="bg-orange-400 p-2 rounded-lg z-30"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="p-2 font-semibold text-sm text-white">
        Explore Other Categories
      </p>
      <Select
        onValueChange={handleOptionChange}
        onOpenChange={(open) => {
          if (setSelectOpen) {
            if (!open) setTimeout(() => setSelectOpen(open), 1000);
            else setSelectOpen(open);
          }
        }}
      >
        <SelectTrigger className="w-full text-[16px] focus:outline-none focus:border-none">
          <SelectValue placeholder="Navigate To:" />
        </SelectTrigger>
        <SelectContent className="z-50">
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
