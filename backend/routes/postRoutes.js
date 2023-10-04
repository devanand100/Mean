import express from 'express'
import { createPost, deletePost, getAllPost, updatePost ,getPostById } from '../controllers/post.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();

router.get('/posts' , getAllPost);
router.get('/posts/:id' , getPostById)
router.post('/posts',upload.single('image'), createPost) ;
router.delete('/posts/:id', deletePost) ;
router.patch("/posts/:id" , updatePost);

export default router