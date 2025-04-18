export interface User {
  id: string;
  name: string;
}

export interface Post {
  id: number;
  userid: number;
  content: string;
  commentCount?: number;
  imageUrl?: string;
}

export interface Comment {
  id: number;
  postid: number;
  content: string;
}

export interface UsersResponse {
  users: Record<string, string>;
}

export interface PostsResponse {
  posts: Post[];
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface UserWithStats extends User {
  commentCount: number;
  postCount: number;
}