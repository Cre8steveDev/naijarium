/**
 * Left Side Bar Component for Desktop View,
 * With Navigation to Popular Tags
 * Might Change its position for sm to md
 */

import SideBarNavigation from './ui/SideBarNavigation';
import UserPersonalNavigation from './ui/UserPersonalNavigation';
import SignOutButton from './ui/SignOutButton';
import { auth } from '@/auth';

const LeftSideBarDesktop = async () => {
  const session = await auth();

  return (
    <div className="md:block top-[100px] sticky hidden md:col-span-2 lg:col-span-2 -mt-2 py-8 md:pl-5 h-full">
      <aside className="p-3 rounded-md w-full">
        <div>
          <SideBarNavigation />
          {session && <UserPersonalNavigation />}

          <SignOutButton />
        </div>
      </aside>
    </div>
  );
};

export default LeftSideBarDesktop;
