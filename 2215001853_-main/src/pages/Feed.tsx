import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getUsers, getUserPosts } from '../api/apiService';
import { Post, User } from '../types';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { RefreshCw as Refresh } from 'lucide-react';
import { addImagesToPost } from '../hooks/usePosts';

const Feed = () => {
  const [allPosts, setAllPosts] = useState<(Post & { userName: string })[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch all users
  const { 
    data: usersData,
    isLoading: usersLoading, 
    error: usersError,
    refetch: refetchUsers
  } = useQuery('users', getUsers, {
    staleTime: 300000, // 5 minutes
  });

  // Helper function to get all posts
  const fetchAllPosts = async (users: Record<string, string>) => {
    const posts: (Post & { userName: string })[] = [];
    const userIds = Object.keys(users).slice(0, 10); // Limit to first 10 users for performance
    
    // Fetch posts for each user
    const postsPromises = userIds.map(async (userId) => {
      try {
        const postsData = await getUserPosts(userId);
        return postsData.posts.map(post => ({
          ...addImagesToPost(post),
          userName: users[userId]
        }));
      } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error);
        return [];
      }
    });

    const postsArrays = await Promise.all(postsPromises);
    return postsArrays.flat();
  };

  // Refresh posts data
  const refreshPosts = async () => {
    if (!usersData || isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      const fetchedPosts = await fetchAllPosts(usersData.users);
      // Sort posts to show newest first (using id as proxy for time)
      const sortedPosts = fetchedPosts.sort((a, b) => b.id - a.id);
      setAllPosts(sortedPosts);
    } catch (error) {
      console.error('Error refreshing posts:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial posts fetch
  useEffect(() => {
    if (usersData) {
      refreshPosts();
    }
  }, [usersData]);

  // Handle refetch
  const handleRefresh = () => {
    refreshPosts();
  };

  if (usersLoading) {
    return <LoadingSpinner message="Loading feed..." />;
  }

  if (usersError) {
    return <ErrorDisplay retry={refetchUsers} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Latest Posts</h1>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isRefreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <Refresh className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Feed'}
        </button>
      </div>

      <div>
        {allPosts.length === 0 && !isRefreshing ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts to display. Try refreshing the feed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                userName={post.userName}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;