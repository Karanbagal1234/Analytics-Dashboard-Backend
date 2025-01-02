import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true,
    },
    Status:{
        type:String,
        required:true,
        default:"Active",
        enum:['Active',"Inactive"]
    }
}, {timestamps:true}); // Optional: Adds createdAt and updatedAt automatically

const User = mongoose.model('User', UserSchema);

export default User