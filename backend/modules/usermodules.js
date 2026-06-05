import Mongoose from "mongoose";

const userSchema=new Mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please add a name"]
        },
        email:{
            type:String,
            require:[true,"Please add a email"],
            unique:true,
        },
        password:{
            type:String,
            require:[true,"Please add a password"]
        },
    }
)
export default Mongoose.model("User",userSchema)
