import mongoose from "mongoose";
import Post from "../models/post.js"

export const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (error) {
        next(error)
    }
}

export const getPostById = async (req , res , next) => {
    try{
        const { id} = req.params;

        if (!id) throw new Error("Id is mising");

        const post = await Post.findOne({_id:id})

        res.status(200).json(post); 

    }catch(error){
        next( error);
    }
}

export const createPost = async (req, res, next) => {

    try {
        const {title , description} = req.body;
        if(!title || !description){
            throw new Error("title and description required")
        }
        let imagePath = req.protocol + '://' + req.get("host") + "/images/" + req.file.filename ;
        const post = await Post.create({title , description , imagePath , creator:req.user.id});
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};


export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Id is missing"); 
        console.log("Deleting")
        console.log("user id",req.user)
        const { deletedCount } = await Post.deleteOne({ _id: id, creator:req?.user?.id})
        if (deletedCount === 0) {
            res.status(401)
          throw new Error("your post not found")
        }
        res.status(204).send("successfully deleted")
    } catch (error) {
        next(error);
    }
}


export const updatePost = async (req, res, next) => {

    try {
        const { id } = req.params;
       if(!mongoose.Types.ObjectId.isValid(id)){
         throw new Error( "Invalid ID format" );
       }
       
       const {title , description} = req.body;
       const updatedPostObj = {
            title , description
       }
       
       if(req?.file?.filename){
        updatedPostObj.imagePath = req.protocol + '://' + req.get("host") + "/images/" + req.file.filename
       }else{
        updatedPostObj.imagePath = req.body.imagePath
       }
       
        const {modifiedCount ,matchedCount } = await Post.updateOne({_id:id , creator:req.user.id},updatedPostObj);
      
        if(modifiedCount === 0 && matchedCount === 0){
            return  res.status(401).send("post not found")
        }

        res.status(200).json("successfully updated post");

    } catch (error) {
        next(error);
    }
}