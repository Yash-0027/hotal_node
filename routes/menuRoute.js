const express=require("express");
const menuRouter=express.Router();
const Menu=require("../models/menu.model");



//   POST route for adding a menu .
menuRouter.post("/",async(req,res)=>{
    try{
        const newMenu= new Menu(req.body)


        const savedMenu= await newMenu.save();
        console.log(savedMenu)
        res.status(201).json({
           success:true,
           message:"menu has been submitted",
           savedMenu

        })

    }catch(err){
        
        res.status(500).json({
            sucess:false,
            message:"failed to saved "
        })
       
    }
})


// get route to get menu data 
menuRouter.get("/",async(req,res)=>{
    try{
        const dataMenu= await Menu.find()
        console.log(dataMenu)
        res.status(200).json({
            success:true,
            message:"menu data fetched",
            dataMenu
        })

    }catch(err){
        res.status(501).json({
            success:false,
            message:"failed to get data"
        })

    }
   
});
menuRouter.get("/:tasteType",async(req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=='spicy' || tasteType=='normal spicy'|| tasteType=='sweet'||
        tasteType=='bitter'){
            const menuData= await Menu.find({taste:tasteType});
            res.status(201).json({
                success:true,
                message:'menu is valid ',
               menuData

            })

        }else{
            console.log('menu is not valid'),
            res.status(501).json({
                success:false,
                message :"menu is not vaild "
            })
        }
            

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"internal server problem ",
        })

    }


});
menuRouter.put("/:id",async(req,res)=>{
    try{

     const menuId=req.params.id;
     const menuData=req.body;

     const newUpdateMenu=await Menu.findByIdAndUpdate(menuId,menuData,{
        new:true,
        runValidators:true,
     })
     if(!newUpdateMenu){
        res.status(501).json({
            sucess:false,
            message:"menu not found "
        })
     }
     console.log("Menu data has been updated ");
     res.status(201).json({
        success:true,
        message:'Menu data has been updated successfully '
     })

    }catch(err){
        console.log(err);
        res.status(404).json({
            success:false,
            message:"internal server error"
        })

    }

});
// delete the data from database 
menuRouter.delete("/:id",async(req,res)=>{
    try{
        const menuId=req.params.id;
        const meunDelete= await Menu.findByIdAndDelete(menuId);
        if(!meunDelete){
            res.status(404).json({
                success:false,
                message:" menu doesnot found "
            })
        };
        console.log(meunDelete);
        res.status(201).json({
            success:true,
            message :"menu data has been deleted successfully "
        })


    }catch(err){
        console.log(err);
        res.status(501).json({
            success:true,
            message:"internal serever error"
        })

    }
})

module.exports=menuRouter;