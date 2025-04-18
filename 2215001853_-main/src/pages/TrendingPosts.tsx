import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers, getUserPosts, getPostComments } from '../api/apiService';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { addImagesToPost } from '../hooks/usePosts';

interface PostWithDetails extends Post {
  userName: string;
  commentCount: number;
}

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState<PostWithDetails[]>([]);
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

  // Find trending posts (posts with max comments)
  useEffect(() => {
    const findTrendingPosts = async () => {
      if (!usersData) return;
      
      setIsCalculating(true);
      try {
        const users = usersData.users;
        const userIds = Object.keys(users);
        
        let allPosts: PostWithDetails[] = [];
        
        // Get posts for each user
        for (const userId of userIds) {
          try {
            const postsData = await getUserPosts(userId);
            const posts = postsData.posts;
            
            // Get comment count for each post
            for (const post of posts) {
              try {
                const commentsData = await getPostComments(post.id);
                const commentCount = commentsData.comments.length;
                
                allPosts.push({
                  ...addImagesToPost(post),
                  userName: users[userId],
                  commentCount
                });
              } catch (error) {
                console.error(`Error fetching comments for post ${post.id}:`, error);
              }
            }
          } catch (error) {
            console.error(`Error fetching posts for user ${userId}:`, error);
          }
        }
        
        // Find max comment count
        const maxCommentCount = Math.max(...allPosts.map(post => post.commentCount), 0);
        
        // Get all posts with max comment count
        const trending = allPosts.filter(post => post.commentCount === maxCommentCount);
        setTrendingPosts(trending);
      } catch (error) {
        console.error('Error finding trending posts:', error);
      } finally {
        setIsCalculating(false);
      }
    };
    
    findTrendingPosts();
  }, [usersData]);

  if (usersLoading || isCalculating) {
    return <LoadingSpinner message={usersLoading ? "Loading posts..." : "Finding trending posts..."} />;
  }

  if (usersError) {
    return <ErrorDisplay retry={refetchUsers} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Trending Posts</h1>
        <p className="text-gray-600 mt-1">Posts with the most comments</p>
      </div>

      {trendingPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No trending posts found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {trendingPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              userName={post.userName} 
              isTrending={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;