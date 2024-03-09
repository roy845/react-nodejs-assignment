import express, { Router } from "express";
import userRoutes from "../routes/userRoutes";
import postsRoutes from "../routes/postsRoutes";

const router: Router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/posts", postsRoutes);

export default router;
