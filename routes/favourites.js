const router= require("express").Router();

const {getFavourites, setFavourite} = require("../utils/favourites");

router.get("/",async(req,res)=>{
    await getFavourites(req,res);
});
router.put("/",async(req,res)=>{
    await setFavourite(req,res);
});

module.exports=router;