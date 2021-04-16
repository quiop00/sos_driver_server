const Notify= require("../models/notify_model");
const router=require("express").Router();

const {getNotifies,pushNotifySOS} = require("../utils/notify");



router.get("",async(req,res)=>{
    await getNotifies(req,res);
});
router.post("/sos",async(req,res)=>{
     console.log("aa");
    await pushNotifySOS(req,res);
});

module.exports = router;