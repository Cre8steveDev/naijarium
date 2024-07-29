/**
 * Create Post Page to be rendered on the
 * global create post route
 */

import CreatePostForm from '@/components/ui/CreatePostForm';

// type CreatePostProps = {
// 	name: string;
// };

const CreatePost: React.FC = () => {
  return (
    <main>
      <div className="mt-6 text-center w-full text-sm p-3">
        <h2 className=" font-bold text-gray-700 dark:text-slate-100 text-2xl">
          Hello! What Would you like to post about today?
        </h2>
        <p className="text-gray-700 dark:text-white ">
          Remember, keep your post clean, entertaining and informative
        </p>
        <CreatePostForm />
      </div>
    </main>
  );
};

export default CreatePost;
