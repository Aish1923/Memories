import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//http://localhost:5000/posts
export const getPosts = async (req, res) => {
  console.log("getPosts in controller")
  try {
    const {page}=req.query;
    const LIMIT=1;
    const StartIndex=(Number(page)-1)*LIMIT;//get the starting index
    const total=await PostMessage.countDocuments({});
    console.log('total',total)
    console.log('StartIndex',StartIndex)
    const post = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(StartIndex);
    console.log('post',post)
    res.status(200).json({data:post,currentPage:Number(page),numberOfPage:Math.ceil(total/LIMIT)});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch =async (req, res) => {
  try {
    const {searchQuery,tags}=req.query;
    const title=new RegExp(searchQuery,'i')
    const posts = await PostMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]});
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const body = req.body;
  const newPost = new PostMessage({...body,creator:req.userId,createdAt:new Date().toISOString()});
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch(error){
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try{
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
  
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  
    res.json(updatedPost);
  }  catch (error){
    res.status(404).json({ message: error });
  }
 

};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostMessage.findByIdAndRemove(id);
  res.status(200).send(`Post deleted with id: ${id}`);
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated!" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send(`No Post with Id:${id}`);
  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req, userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  await PostMessage.findByIdAndUpdate(id, post, { new: true });
};
