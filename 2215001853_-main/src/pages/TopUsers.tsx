import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers, getUserPosts, getPostComments } from '../api/apiService';
import { User, UserWithStats } from '../types';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState<UserWithStats[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Fetch all users
  const { 
    data: usersData, 
    isLoading: usersLoading, 
    error: usersError,
    refetch: refetchUsers
  } = useQuery('users', getUsers, {
    staleTime: 300000, // 5 minutes
  });

  // Calculate user statistics
  useEffect(() => {
    const calculateTopUsers = async () => {
      if (!usersData) return;
      
      setIsCalculating(true);
      try {
        const users = usersData.users;
        const userIds = Object.keys(users);
        
        const userStatsPromises = userIds.map(async (userId) => {
          try {
            // Get user posts
            const postsData = await getUserPosts(userId);
            const posts = postsData.posts;
            
            // Count comments for each post
            let totalComments = 0;
            for (const post of posts) {
              try {
                const commentsData = await getPostComments(post.id);
                totalComments += commentsData.comments.length;
              } catch (error) {
                console.error(`Error fetching comments for post ${post.id}:`, error);
              }
            }
            
            return {
              id: userId,
              name: users[userId],
              postCount: posts.length,
              commentCount: totalComments
            };
          } catch (error) {
            console.error(`Error processing user ${userId}:`, error);
            return {
              id: userId,
              name: users[userId],
              postCount: 0,
              commentCount: 0
            };
          }
        });
        
        const userStats = await Promise.all(userStatsPromises);
        
        // Sort users by comment count and get top 5
        const sortedUsers = userStats
          .sort((a, b) => b.commentCount - a.commentCount)
          .slice(0, 5);
        
        setTopUsers(sortedUsers);
      } catch (error) {
        console.error('Error calculating top users:', error);
      } finally {
        setIsCalculating(false);
      }
    };
    
    calculateTopUsers();
  }, [usersData]);

  if (usersLoading || isCalculating) {
    return <LoadingSpinner message={usersLoading ? "Loading users..." : "Calculating top users..."} />;
  }

  if (usersError) {
    return <ErrorDisplay retry={refetchUsers} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Top Users</h1>
        <p className="text-gray-600 mt-1">Users with the most commented posts</p>
      </div>

      {topUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No user data available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topUsers.map((user, index) => (
            <UserCard key={user.id} user={user} rank={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUsers;