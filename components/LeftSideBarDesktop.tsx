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
    <div className="col-span-2 h-full px-5 py-8 sticky top-0 -mt-2">
      <aside className="w-full rounded-md  p-3">
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
