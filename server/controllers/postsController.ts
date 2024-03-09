import { Request, Response } from "express";
import getPrismaClient from "../prismaClient/prismaClient";
import axios from "axios";
import { posts_url } from "../constants/apiPaths";
import { PostsResponse } from "../types/postTypes";

const prisma = getPrismaClient();

const getUserPostsHelper = async (
  userId: number,
  limit: number,
  skip: number
) => {
  const userPosts = await prisma.post.findMany({
    where: { userId: +userId },
    include: {
      user: true,
    },
    skip,
    take: limit,
  });

  return userPosts;
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const limit: number = 4;
    const page = Number(req.query.page) || 0;
    const skip: number = page * limit;

    if (!userId) {
      return res.status(400).send("userId not provided");
    }

    let userPosts = await getUserPostsHelper(+userId, limit, skip);

    if (userPosts.length === 0) {
      const { data: externalPosts } = await axios.get<PostsResponse[]>(
        `${posts_url}?userId=${userId}`
      );
      await prisma.post.createMany({
        data: externalPosts.map((post: PostsResponse) => ({
          title: post.title,
          body: post.body,
          userId: post.userId,
        })),
      });

      userPosts = await getUserPostsHelper(+userId, limit, skip);
    }

    const totalUserPostsCount = await prisma.post.count({
      where: { userId: +userId },
    });
    res.json({
      userPosts: userPosts,
      totalUserPostsCount: totalUserPostsCount,
    });
  } catch (error) {
    res.status(500).send("Failed in fetching user posts");
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).send("postId not provided");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
    });

    if (post) {
      res.json(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Failed in fetching post");
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    // Validate postId
    if (!postId) {
      return res.status(400).send("postId not provided");
    }

    const postToDelete = await prisma.post.findUnique({
      where: { id: +postId },
    });

    // Check if post exists
    if (!postToDelete) {
      return res.status(404).send("Post not found");
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: +postId },
    });

    res
      .status(200)
      .json({ message: "Post deleted successfully", deletedPostId: postId });
  } catch (error) {
    res.status(500).send("Failed in deleting user post");
  }
};
