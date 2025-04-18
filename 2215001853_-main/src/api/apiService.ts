import axios from 'axios';
import { UsersResponse, PostsResponse, CommentsResponse } from '../types';

const API_BASE_URL = '/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// export const getUsers = async () => {
//   try {
//     const response = await api.get<UsersResponse>('/users');
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch users", error);
//     throw error;
//   }
// };

export const getUsers = async () => {
  const token = localStorage.getItem("token"); // or get it from a context or cookie
  const response = await axios.get("http://localhost:3000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`, // <-- Make sure this is what your backend expects
    },
    withCredentials: true, // <-- only if your backend uses cookies
  });
  return response.data;
};


// export const getUsers = async () => {
//   const response = await api.get<UsersResponse>('/users');
//   return response.data;
// };

export const getUserPosts = async (userId: string) => {
  const response = await api.get<PostsResponse>(`/users/${userId}/posts`);
  return response.data;
};

export const getPostComments = async (postId: number) => {
  const response = await api.get<CommentsResponse>(`/posts/${postId}/comments`);
  return response.data;
};