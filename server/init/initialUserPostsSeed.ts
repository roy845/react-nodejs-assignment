import axios from "axios";
import getPrismaClient from "../prismaClient/prismaClient";
import { PostsResponse } from "../types";
import { posts_url } from "../constants/apiPaths";

export const init_posts_db = async (): Promise<void> => {
  const prisma = getPrismaClient();

  const { data: newPosts } = await axios.get(posts_url);

  const convertedPosts = newPosts.map((p: PostsResponse) => ({
    userId: p.userId,
    title: p.title,
    body: p.body,
  }));

  await prisma.post.createMany({
    data: convertedPosts,
    skipDuplicates: true,
  });
};
