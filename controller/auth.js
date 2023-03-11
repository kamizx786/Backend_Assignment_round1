import User from "../models/user";
import jwt from "jsonwebtoken";
import {nanoid} from "nanoid";
import {hashpassword ,comparepassword}from "../helpers/auth";
export const  register=async(req,res)=>{
    const {name,email,password}=req.body;
    const exist = await User.findOne({email});
    if (exist) 
    {
        return res.json({
            error:"User Already Exist"
        })
    } 
    if(!password || password.length<6) 
    {
        return res.json({
            error:"Password is Required and Should be atleast 6 characters"
        })
    } 
    const hashedpassword= await hashpassword(password);
    const user=new User({name,email,password:hashedpassword
        ,username:nanoid(6)});
   try
   {
   await user.save();
   return res.json({ok:true})
   }
   catch(err)
   {
       console.log("Register Error",err);
       return res.json({
        error:"Try Again"
    })
   }
   

}
export const login=async (req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) { 
            return  res.json({
                error:"User Not Found"
            })
        }
        const match= await comparepassword(password,user.password);
        if(!match)
        {
            return res.json({
                error:"Wrong password"
            })
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
          expiresIn:'7d'  
        });
        user.password=undefined;
        user.secret=undefined;
      return res.json({
           "token":token,
           "user_id":user._id
        })

    }
    catch(err)
    {
        console.log("Login Error",err);
        return res.json({
            error:"Try Again"
        })
    }
}
