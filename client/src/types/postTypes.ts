import { User } from "./userTypes";

export type Post = {
  body: string;
  id: number;
  title: string;
  user: User;
  userId: number;
};

export type PostResponse = {
  userPosts: Post[];
  totalUserPostsCount: number;
};
