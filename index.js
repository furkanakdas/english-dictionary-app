import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Word } from "./models/Word.js";
import {dirname} from "path"
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.static(path.join(__dirname,"/client/build")));

const port = process.env.PORT || 3001;

try{
  await mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  
}catch(e){
  console.log(e)
}


function isJsonStructure(variable) {
  if (typeof variable !== "string") return false;
  try {
      const parsedJson = JSON.parse(variable);
      return typeof parsedJson === "object" && parsedJson !== null;
  } catch (error) {
      return false;
  }
}

app.use("/",(req,res,next)=>{
  next();
})


app.use("/word/filter",(req,res,next) =>{

  try {
    Object.keys(req.query).forEach(key =>{

      if(isJsonStructure(req.query[key])){
        req.query[key] = JSON.parse(req.query[key]);
      }
  
    })
  
    let myQuery = Word.find();
  
  
    if(req.query.where){
  
      Object.keys(req.query.where).forEach(key =>{
        myQuery.where(key).equals(req.query.where[key])
      })
    }
  
    if(req.query.like){
      Object.keys(req.query.like).forEach(key =>{
        myQuery.where(key).regex(new RegExp(req.query.like[key],"i"))
      }) 
    }
  
  
    if(req.query.skip){
      myQuery.skip(req.query.skip)
    }
  
    if(req.query.limit){
      myQuery.limit(req.query.limit)
    }
  
    req.myQuery = myQuery;
  
    next();
  } catch (error) {
    console.log(error);
    res.json({error:error})
  }


})



app.get("/word/filter/count",async (req,res)=>{

  try {

    let number = await req.myQuery.countDocuments().exec();

    res.json({success:{message:"no",data:number}})

  } catch (error) {
    console.log(error);
    res.json({error:error})
  }

})


app.get("/word/filter",async (req,res)=>{

  try {

      let words = await req.myQuery.sort({createdAt:-1}).exec();
       res.json({success:{message:"All Words",data:words}});
    

  } catch (error) {
    console.log(error);
    res.json({error:error})
  }

})


app.get("/word",async (req,res)=>{
  try {

  let words = await Word.find(filter).sort({createdAt:1}).limit(25);

    
  res.json({success:{message:"All Words",data:words}});

  } catch (e) {
    console.log(e);
    res.json({error:e})
  }


})

app.delete("/word/:id",async (req,res)=>{

  try {

    await Word.deleteOne({_id:req.params.id})


    res.json({success:{message:"deleted"}});

  } catch (error) {
    res.json({error:error})
  }

})


app.post("/word", async (req,res)=>{

  try {
    let newWord =  await Word.create(req.body);

    res.json({success:{message:"Word Inserted!",data:newWord}})
  } catch (e) {
    res.json({error:e})
  }

})

app.put("/word",async (req,res)=>{

  try {
    await Word.deleteOne({_id:req.body._id});

    req.body._id=undefined;

   let newWord =  await Word.create(req.body)

   res.json({success:{message:"update ok",data:newWord}})

  } catch (error) {
    res.json({error:error})
  }


})
 
app.get("*",(req,res)=>{

  res.sendFile(path.join(__dirname + "/client/build/index.html"),err =>{

    res.status(500).send(err)

  })

})

app.listen(port, () => {

  console.log(`App is running on Port ${port}`);
});






