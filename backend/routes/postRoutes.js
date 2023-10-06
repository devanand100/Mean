import express from 'express'
import { createPost, deletePost, getAllPost, updatePost ,getPostById } from '../controllers/post.js';
import { upload } from '../middlewares/multer.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.get('/posts' , getAllPost);
router.get('/posts/:id' , getPostById)
router.post('/posts' ,auth ,upload.single('image'), createPost) ;
router.delete('/posts/:id', deletePost) ;
router.patch("/posts/:id" ,upload.single('image') , updatePost);

export default router