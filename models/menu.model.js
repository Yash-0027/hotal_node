const mongoose =require("mongoose");
const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        
        
    },
    taste:{
        type:String,
        enum:['spicy', 'normal spicy','sweet','bitter'],
        required:true,

    },
    is_drink:{
        type:String,
       
    },
    tip:{
        type:Number,
        required:true


    }
   
   
    

},{timestamps:true});
module.exports=mongoose.model("Menu",menuSchema);
