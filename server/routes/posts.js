import express from "express";
import {getPostsBySearch, getPosts,createPosts,updatePost,deletePost,likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();



//http://localhost:5000/posts

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.post("/",auth, createPosts);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
export default router;
