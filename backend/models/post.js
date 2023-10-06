import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String, required: true
  },
  description:
    { type: String, required: true },
  imagePath: {
    type: String, required: true
  } ,
  creator :{
    type:mongoose.Schema.Types.ObjectId , ref :"User"  , required:true 
  }
})

const Post = mongoose.model('Post', PostSchema)
export default Post