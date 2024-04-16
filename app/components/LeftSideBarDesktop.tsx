const LeftSideBarDesktop = () => {
  return (
    <div className="col-span-2 h-full px-5 py-8 sticky top-0">
      <aside className="w-full rounded-md bg-white p-3">
        <div>
          <h3 className="flex items-center gap-2 cursor-pointer">
            Top Rated Posts!
          </h3>
        </div>
      </aside>
    </div>
  );
};

export default LeftSideBarDesktop;
