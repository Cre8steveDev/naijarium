'use client';

type PostActionProps = {
  title: string;
  bgColor: string;
  onClick: () => void;
};

const PostAction: React.FC<PostActionProps> = ({ title, bgColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} + " text-white flex gap-2 p-1 px-2 rounded-lg cursor-pointer hover:opacity-50 transition-opacity ease-in"`}
    >
      <p className="text-xs sm:text-base">{title}</p>
    </button>
  );
};

export default PostAction;
