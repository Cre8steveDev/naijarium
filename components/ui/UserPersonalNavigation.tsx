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
    { title: 'Your Replies', route: `/${user?.username}/replies` },
    { title: 'Posts You Liked', route: `/${user?.username}/likes` },
    {
      title: 'LIkes and Upvotes',
      route: `/${user?.username}/likes-upvotes`,
    },
  ];

  return (
    <div className=" p-2 rounded-lg bg-white mt-5">
      <p className="font-semibold text-gray-700 text-md p-2 mb-4">
        Personal Navigation
      </p>

      {personalNavLinks.map((link) => (
        <Link key={link.title} href={link.route}>
          <p className="w-full p-2 my-1 hover:bg-slate-100 transition ease-in cursor-pointer">
            {link.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default UserPersonalNavigation;
