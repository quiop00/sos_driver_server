const router = require("express").Router();

const {ratingServicer,getHistoryServicer, getRatingsOfServicer}
  =require("../utils/rating");

router.get('/history',async(req,res)=>{
    await getHistoryServicer(req,res);
});
router.get('/',async(req,res)=>{
    await getRatingsOfServicer(req,res);
});
router.put("/",async(req,res)=>{
    await ratingServicer(req,res);
});

module.exports=router;