import { FaFireAlt } from 'react-icons/fa';

const RightSideBarDesktop = () => {
  return (
    <div className="top-10 sticky lg:flex flex-col gap-10 hidden col-span-2 px-5 py-8">
      {/* Select Topics Panel */}
      <aside className="bg-white p-3 rounded-lg w-full">
        <div>
          <h3 className="flex items-center gap-2">
            <FaFireAlt className="hover:text-orange-600 transition ease-in" />{' '}
            Top Rated Posts!
          </h3>
        </div>
      </aside>

      {/* Mini User Dashboard */}
      <aside className="bg-white p-3 rounded-lg w-full">
        <div>
          <h3 className="flex items-center gap-2">Hello Stephen!</h3>
        </div>
      </aside>
    </div>
  );
};

export default RightSideBarDesktop;
