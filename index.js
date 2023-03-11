import express from "express";
import mongoose, { model } from "mongoose";
import cors from "cors";
import {readdirSync} from "fs"
const app=express();
const http=require("http").createServer(app);

const morgan=require("morgan");
require("dotenv").config();

mongoose.connect("mongodb+srv://kami786:kamikami88@cluster0.zui4rdw.mongodb.net/?retryWrites=true&w=majority",{})
.then(()=>console.log("Database Connected"))
.catch((err)=>console.log("Databse Error",err));

//middleware
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:["http://localhost:3000"],
}));

readdirSync("./routes").map((r)=>app.use("/api",require(`./routes/${r}`)));

const port=process.env.PORT||5000;
http.listen(port,()=>console.log(`Server is Running on Port ${port}`));
module.exports=http;