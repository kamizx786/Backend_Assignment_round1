import mongoose from "mongoose";
const {Schema}=mongoose;
const USerSchema =new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    username:{
      type:String,
      required:true,
      unique:true,
    },
    role:{
        type:String,
        default:"Subscriber",
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:65,
    },

},{timestamps:true});
export default mongoose.model("User",USerSchema);

