import Link from 'next/link';
import { postsCategoryNavLinks } from '@/constants/categoriesAndRoutes';

type Props = {
  category: string;
};

const CategoryTag = ({ category }: Props) => {
  const route = postsCategoryNavLinks.find(
    (value) => value.title === category
  )?.route;

  return (
    <div className="flex gap-3">
      <Link href={`/posts/category/${route}`}>
        <div className="bg-gray-200 hover:bg-opacity-80 p-1 sm:p-2 rounded-md text-gray-700 text-xs">
          {category}
        </div>
      </Link>
    </div>
  );
};

export default CategoryTag;
