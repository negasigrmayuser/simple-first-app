import mongoose from "mongoose";

const goalSchema=new mongoose.Schema(
   {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    text: {
        type:String,
        require:[true,"Please write some text"]
    },
    
   },
   {
        timestamps:true,
    }
)
export default mongoose.model("Goal",goalSchema);

















