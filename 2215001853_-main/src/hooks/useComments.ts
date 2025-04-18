import { useQuery } from 'react-query';
import { getPostComments } from '../api/apiService';

export const usePostComments = (postId: number) => {
  return useQuery(
    ['comments', postId],
    async () => {
      const data = await getPostComments(postId);
      return data.comments;
    },
    {
      enabled: !!postId,
    }
  );
};