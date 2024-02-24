import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Word } from "./models/Word.js";
import path from "path"
import { parse } from 'csv-parse';
import fs, { truncate } from "fs"

const __dirname = path.resolve();

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.static(path.join(__dirname,"/client/build")));

const port = process.env.PORT;

try{

  await mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // const dosyaYolu = './test.csv';

  // fs.createReadStream(dosyaYolu)
  // .pipe(parse({
  //   delimiter: ',',
  //   quote: '"',
  //   headers: true,
  //   columns:["","eng","tr","telaffuz","Derece","Tek"]
  // }))
  // .on('data',async (satir) => {

  //   let type;

  //   if(satir.Derece.toString() == "deyim"){
  //     type = "expression";
  //   }else{
  //     type="word"
  //   }
    
  //   let o = {english:satir.eng,turkish:satir.tr,pronounce:satir.telaffuz,type:type}
  //   await Word.create(o);
  // })
  // .on('end', () => {
  //   console.log('CSV dosyası okuma tamamlandı');
  // });


}catch(e){
  console.log(e)
}



app.post("/word", async (req,res)=>{

  await Word.find({english:{$regex:/as/i}})


  try {
    let newWord =  await Word.create(req.body);

    res.json({success:{message:"Word Inserted!",data:newWord}})
  } catch (e) {
    res.json({error:e})
  }

})

app.get("/word",async (req,res)=>{
  try {

  let filter = {}

  if(req.query.where){
    let where = JSON.parse(req.query.where);
    Object.assign(filter,where);
  }

 

  if(req.query.like){
    let like = JSON.parse(req.query.like);

    Object.keys(like).forEach(key =>{

    Object.assign(filter,{[key]:{$regex:new RegExp(like[key],"i")}});
    })
  }

  let words = await Word.find(filter).sort({createdAt:1}).limit(10);
  
    
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


    // await Word.create({english:"pencil",turkish:"kalem",pronounce:"pensıl",type:0,level:0})
    // await Word.create({english:"bag",turkish:"çanta",pronounce:"beg",type:0,level:0})
    // await Word.create({english:"call off",turkish:"azarlamak",pronounce:"kol of",type:1,level:1})
    // await Word.create({english:"window",turkish:"pencere",pronounce:"vindov",type:0,level:1})
    // await Word.create({english:"computer",turkish:"bilgisayar",pronounce:"kımpütır",type:0,level:1})
    // await Word.create({english:"hi",turkish:"merhaba",pronounce:"hay",type:0,level:0})
    // await Word.create({english:"when pigs fly",turkish:"asla olmayacak",pronounce:"ven pigs fılay",type:1,level:2})
    // await Word.create({english:"salt",turkish:"tuz",pronounce:"salt",type:0,level:1})
    // await Word.create({english:"you",turkish:"sen",pronounce:"yu",type:0,level:0})







