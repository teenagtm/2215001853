import { User } from 'lucide-react';
import { UserWithStats } from '../types';

interface UserCardProps {
  user: UserWithStats;
  rank: number;
}

const UserCard = ({ user, rank }: UserCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex items-center">
      <div className="flex-shrink-0 mr-4">
        <div className="bg-blue-100 rounded-full p-2 w-12 h-12 flex items-center justify-center">
          <User className="text-blue-600 w-8 h-8" />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800">{user.name}</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Rank #{rank}
          </span>
        </div>
        <div className="mt-1 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div>
              <span className="font-medium text-gray-900">{user.postCount}</span> posts
            </div>
            <div>
              <span className="font-medium text-gray-900">{user.commentCount}</span> comments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;