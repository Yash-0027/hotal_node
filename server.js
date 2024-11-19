
const express = require("express");
const app=express();

// load env file 
require('dotenv').config();

// Import and connect to the database.
require ('./config/database').connect();


// Middleware to parse incoming request bodies as JSON.
const bodyParser=require('body-parser');
app.use(bodyParser.json());

const PORT=process.env.PORT || 5000


// import route and moun it for user 
const userRoutes=require("./routes/userRoute");
app.use("/user",userRoutes);


// import route for menu
const menuRouter=require("./routes/menuRoute");
app.use("/menu",menuRouter)




app.get("/",(req,res)=>{

    res.send('welcome to the hotal wallah ')
});

// listen   port 
app.listen(PORT,()=>{
    console.log(`Server is listeing at Port ${PORT}`)
})

