/**Navigation for User's Personal Posts
 * Replies to Posts
 * Likes and Upvotes
 */

const UserPersonalNavigation = () => {
  return (
    <div className=" p-2 rounded-lg bg-white mt-5">
      <p className="font-semibold text-gray-700 text-md p-2 mb-4">
        Personal Navigation
      </p>

      <p className="w-full p-2 my-1 hover:bg-slate-100 transition ease-in cursor-pointer">
        Your Posts
      </p>
      <p>Your Replies</p>
      <p>Posts You&apos;ve Liked</p>
      <p>Your Likes and Upvotes</p>
    </div>
  );
};

export default UserPersonalNavigation;
