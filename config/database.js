// import  the mongoose 
const mongoose=require('mongoose');
require('dotenv').config()


exports.connect=()=>{
    mongoose.connect(process.env.mongodb_URL)

    
    //     ,{
    //     useNewUrlParser:true,
    //     useUnifedTopology:true
    // }

    .then(()=>{console.log("DB connected successfully ")})
    .catch((err)=>{
        console.log("DB connection issues");
        console.error(err);
        process.exit(1);

    })
 }