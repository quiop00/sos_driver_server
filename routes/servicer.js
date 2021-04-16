const router = require("express").Router();

const {acceptSOS, rejectSOS} =require("../utils/servicer");

router.put("/accept",async(req,res)=>{
    await acceptSOS(req,res);
});

router.put("/reject",async(req,res)=>{
    await rejectSOS(req,res);
})

module.exports=router;