import { auth } from '@/auth';
import Link from 'next/link';

/**Navigation for User's Personal Posts
 * Replies to Posts
 * Likes and Upvotes
 */

const UserPersonalNavigation = async () => {
  const session = await auth();

  const user = session?.user as { username: string } & any;

  const personalNavLinks = [
    { title: 'Your Posts', route: `/${user?.username}/posts` },
    { title: 'Your Comments', route: `/${user?.username}/replies` },
    { title: 'Posts You Upvoted', route: `/${user?.username}/likes` },
    {
      title: 'Your Trybe',
      route: `/${user?.username}/likes-upvotes`,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-600 mt-5 p-2 rounded-lg">
      <p className="mb-1 p-2 font-semibold text-gray-700 dark:text-slate-100 text-md">
        Personal Navigation
      </p>

      {personalNavLinks.map((link) => (
        <Link key={link.title} href={link.route}>
          <p className="hover:bg-slate-100 hover:dark:bg-slate-700 my-1 p-2 w-full transition cursor-pointer ease-in">
            {link.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default UserPersonalNavigation;
