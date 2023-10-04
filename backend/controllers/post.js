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
        let imagePath = req.protocol + '://' + req.get("host") + "/images/" + req.file.filename ;
        console.log({title , description , imagePath})
        const post = await Post.create({title , description , imagePath});
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};


export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Id is mising");
        const { deletedCount } = await Post.deleteOne({ _id: id })
        if (!deletedCount) {
          return  res.status(404).send("post not found")
        }
        res.status(204).send("succesfully deleted")
    } catch (error) {
        next(error);
    }
}


export const updatePost = async (req, res, next) => {

    try {
        const { id } = req.params;
       if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({ message: "Invalid ID format" });
       }

        const updatedPost = await Post.findByIdAndUpdate(id,req.body,{new: true});

        if(!updatedPost){
            return  res.status(404).send("post not found")
        }

        res.status(200).json("sucessfully updated post");

    } catch (error) {
        next(error);
    }
}