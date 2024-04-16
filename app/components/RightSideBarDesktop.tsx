import { FaFireAlt } from 'react-icons/fa';

const RightSideBarDesktop = () => {
  return (
    <div className="col-span-2 px-5 py-8 sticky top-10">
      <aside className="w-full rounded-lg bg-white p-3">
        <div>
          <h3 className="flex items-center gap-2 cursor-pointer">
            <FaFireAlt className="hover:text-orange-600 transition ease-in" />{' '}
            Top Rated Posts!
          </h3>
        </div>
      </aside>
    </div>
  );
};

export default RightSideBarDesktop;
