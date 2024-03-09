import express, { Router } from "express";
import {
  getUserPosts,
  deletePost,
  getPost,
} from "../controllers/postsController";

const router: Router = express.Router();

router.get("/:userId", getUserPosts);
router.get("/getPost/:postId", getPost);
router.delete("/:postId", deletePost);

export default router;
