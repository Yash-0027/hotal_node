const mongoose =require("mongoose");


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true

    },
    age:{
        type:String,
        required:true,
        
        },
    work:{
        type:String,
        enum:['Chef', 'waiter','manager','owner'],
        required:true,

    },
    mobile:{
        type:Number,
        required:true,
    },

        
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
        
    },
    salary:{
        type:Number,
        required:true,
    }


},{timestamps:true})

module.exports=mongoose.model("User",userSchema);
