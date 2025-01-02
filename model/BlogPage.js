import mongoose, { Schema } from "mongoose";

const BlogPage = new Schema({
    PageUrl : {
        type:String,
        required:true,
    }
},{timestamps:true})

export default mongoose.model("Page",BlogPage)