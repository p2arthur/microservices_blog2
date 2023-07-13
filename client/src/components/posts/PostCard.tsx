import PostInterface from '../../interface/PostInterface';
import CreateComment from '../comments/CreateComment';
import CommentList from '../comments/CommentsList';

export default function PostCard({ id, title, comments }: PostInterface) {
  console.log('post', title);
  console.log('postId', id);

  return (
    <div className="bg-orange-500 shadow-md p-2 rounded flex flex-col justify-between gap-2 hover:scale-101 hover:shadow-lg transition-all">
      <div className="flex flex-col justify-between h-16">
        <h1 className="text-purple-800 text-lg leading-6 font-bold">{title}</h1>
        <div className="h-px bg-purple-800 w-full" />
      </div>

      <CommentList comments={comments} />

      <div>
        <CreateComment id={id} />
      </div>
    </div>
  );
}
