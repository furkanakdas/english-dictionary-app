import mongoose from "mongoose";

const versionSchema = new mongoose.Schema({
    json :  mongoose.Schema.Types.Mixed,
    status:{
        type:Number,
        required:true,
        enum:[1,2,3]
    },
    createdDate:Date
});
const ftp = new mongoose.Schema({
    user:String,
    password:String,
    url:{
        type:String,
        required:true
    }
})
const folder = new mongoose.Schema({
    path:String,
    versions:[versionSchema],
    ftp:ftp
})


const word = new mongoose.Schema({
    english:String,
    turkish:String,
    pronounce:String,
    type:{type:String,default:"word",enum:["word","expression"]},
    level:{type:String,default:"hard",enum:["easy","medium","hard"]},
    view:{type:Number,default:0},
    createdAt: {
        type: Date,
        immutable:true,
        default: ()=>Date.now(),
    }
})


export const Word = mongoose.model("Word",word);

