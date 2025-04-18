import { useState } from 'react';
import { MessageSquare, Heart } from 'lucide-react';
import { Post } from '../types';
import { usePostComments } from '../hooks/useComments';

interface PostCardProps {
  post: Post;
  userName: string;
  isTrending?: boolean;
}

const PostCard = ({ post, userName, isTrending = false }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const { data: comments = [] } = usePostComments(post.id);
  
  const commentCount = post.commentCount || comments.length;
  const likeCount = Math.floor(Math.random() * 50) + 1;
  
  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-all duration-300 
      ${isTrending ? 'border-2 border-yellow-400' : ''}`}>
      {isTrending && (
        <div className="bg-yellow-400 text-yellow-800 px-4 py-1 text-sm font-medium">
          Trending 🔥
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-800 font-medium">
              {userName.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900">{userName}</p>
            <p className="text-sm text-gray-500">
              {new Date(Date.now() - Math.random() * 8640000000).toLocaleDateString()} 
            </p>
          </div>
        </div>
        <p className="text-gray-800 mb-4">{post.content}</p>
        
        {post.imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt="Post image" 
              className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500" 
            />
          </div>
        )}
        
        <div className="flex items-center justify-between text-gray-500 border-t pt-4">
          <button 
            className={`flex items-center space-x-1 ${liked ? 'text-red-500' : ''} hover:text-red-500 transition-colors duration-200`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
            <span>{liked ? likeCount + 1 : likeCount}</span>
          </button>
          
          <div className="flex items-center space-x-1 text-gray-500">
            <MessageSquare className="h-5 w-5" />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;