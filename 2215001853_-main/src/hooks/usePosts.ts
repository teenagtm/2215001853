import { useQuery } from 'react-query';
import { getUserPosts } from '../api/apiService';
import { Post } from '../types';

export const useUserPosts = (userId: string) => {
  return useQuery(
    ['posts', userId],
    async () => {
      const data = await getUserPosts(userId);
      return data.posts;
    },
    {
      enabled: !!userId,
    }
  );
};

// Generate a random image URL for a post
export const getRandomImageUrl = (seed: number): string => {
  const categories = ['nature', 'city', 'people', 'technology', 'animals'];
  const randomCategory = categories[seed % categories.length];
  const width = 600;
  const height = 400;
  return `https://source.unsplash.com/random/${width}x${height}?${randomCategory}&sig=${seed}`;
};

// Add random images to posts
export const addImagesToPost = (post: Post): Post => {
  return {
    ...post,
    imageUrl: getRandomImageUrl(post.id),
  };
};