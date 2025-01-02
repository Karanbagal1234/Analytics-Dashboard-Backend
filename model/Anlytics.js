import mongoose, { Schema } from "mongoose";

const AnlyticsData = new Schema({
    UserName:{
        type: mongoose.Types.ObjectId,
        ref:'User',
    },
    Source:{
        type:String,
        required:true,
        enum:['Direct','Search',"Referral","Unknown"],

    },
    Device:{
        type:String,
        required:true,
        enum:['Mobile',"DeskTop","Tablet","Unknown"]
    },
    Age:{
        type:Number,
    },
 
},{ timestamps: true })

export default mongoose.model('AnalyticsData', AnlyticsData);