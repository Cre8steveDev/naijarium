import getGreeting from '@/lib/getCurrentGreeting';
import { User } from 'next-auth';
import Link from 'next/link';

/**Navigation for User's Personal Posts
 * Replies to Posts
 * Likes and Upvotes
 */

const MobileUserPersonalNavigation = ({
  user,
  setShowMobileMenu,
}: {
  user: User & { username: string };
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const personalNavLinks = [
    { title: 'Your Posts', route: `/${user?.username}/posts` },
    { title: 'Your Replies', route: `/${user?.username}/replies` },
    { title: 'Posts You Liked', route: `/${user?.username}/likes` },
    {
      title: 'LIkes and Upvotes',
      route: `/${user?.username}/likes-upvotes`,
    },
  ];

  return (
    <div className="bg-white mt-5 p-2 rounded-lg">
      {/* Greeting Component  */}
      <div className="p-2 bg-slate-100 rounded-lg">
        <p>{getGreeting()}</p>
        <h2 className="font-black text-2xl text-slate-500">@{user.username}</h2>
      </div>

      <p className="mb-4 p-2 font-semibold text-gray-700 text-md">
        Personal Navigation
      </p>

      {personalNavLinks.map((link) => (
        <Link
          key={link.title}
          href={link.route}
          onClick={() => setShowMobileMenu(false)}
        >
          <p className="hover:bg-slate-100 my-1 p-2 w-full transition cursor-pointer ease-in">
            {link.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default MobileUserPersonalNavigation;
