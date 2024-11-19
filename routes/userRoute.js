const express=require("express");
const router=express.Router();
const User=require("../models/user.model");
// POST route for adding a user.
router.post("/",async(req,res)=>{
    try{
      const user =new User(req.body);
       // Saving the new user to the database using Mongoose's `save()` method.
      const savedUSer= await user.save();
      res.status(201).json({
          success:true,
          message:"data has been saved",
          savedUSer, })
    }catch(err){
      console.log("error saving user ",err);
      res.status(500).json({
          success:false,
          message:"Error saving user",
          error:err.message
      })
    }
      
  
  });

  // get method to get person data 

router.get("/",async(req,res)=>{
    try{
        const data =await User.find();
        console.log(data)
        res.status(201).json({
           
            success:true,
            data,
            message:"data has been displayed "
        })

    }catch(err){
        console.log(`data cannot be displayed ${err}`)

    }
});

// worktype
router.get("/:workType",async(req,res)=>{
    try{
        // extract the work type from the url parameter
        const workType=req.params.workType;
        if(workType=="Chef" || workType=="manager" || workType=="waiter" || workType=="owner"){
           const response= await User.find({work:workType});
           console.log('work is valid ');
           res.status(200).json({
            success:true,
            message:"work is valid ",
            response

           })

        }else{
            res.status(404).json({
                success:false ,
                message:"invalid work type "
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'internal server Error'
        })

    }
});
// route for upadate data 
router.put("/:id",async(req,res)=>{
    try{
        // extract the id from the url parameter
        const userId=req.params.id;
        const updatedUserData=req.body;
         
        const userNewData=await User.findByIdAndUpdate(userId,updatedUserData,{
            // return the upadated document 
            new:true,
            // runn mongoose validations
            runValidators:true,
        })
        if(!userNewData){
            return res.status(404).json({
                success:false ,
                message:"user not found"
            })
        }
        console.log('data updated');
        res.status(200).json(userNewData);



    }catch(err){
        console.log(err);
        res.status(500).json(
            {
                success:false,
                message:"internal server error"
            }
        )

    }
});

// route for delete data 
router.delete("/:id",(req,res)=>{
    try{
        const userId=req.params.id;
    const userDelete= User.findByIdAndDelete(userId);
    if(!userDelete){
        return res.status(200).json({
            success:true,
            message:'person doesnot found '

        })
    }
    console.log("data deleted");
    res.status(200).json({
        success:true,
        message:"data successfully delected"
    });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"internal server error "
        })

    }
    
})

module.exports=router;