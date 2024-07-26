import { BiUpvote } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { LuMessagesSquare } from 'react-icons/lu';

// Define Prop Types

type StatProps = {
  views: number;
  comments: number;
  upvotes: number;
};

const PostStats = ({ views, comments, upvotes }: StatProps) => {
  return (
    <div className="flex gap-2 text-[14px] text-gray-500 cursor-default">
      <div className="flex items-center gap-2">
        <FiEye className="hover:text-orange-600" /> {views}
      </div>

      <div className="flex items-center gap-2">
        <LuMessagesSquare className="hover:text-orange-600" /> {comments}
      </div>

      <div className="flex items-center gap-2">
        <BiUpvote className="hover:text-orange-600" /> {upvotes}
      </div>
    </div>
  );
};

export default PostStats;
