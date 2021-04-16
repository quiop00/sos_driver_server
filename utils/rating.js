const Rating = require("../models/rating_model");
const Driver = require("../models/driver_model");

const {getUserFromToken} =require("./authentication");

const initRating = async(servicer,driver,res)=>{
    try{
        if(!driver)
            return res.status(201).json({
                status: false
            });
        var newRating=new Rating({
            servicer: servicer,
            driver: driver
        });
        await newRating.save();
    }
    catch(error){
        return res.status(500).json({
            message:"Error"
        })
    }
}
const ratingServicer= async(req,res)=>{
    try{
        var _id=req.body._id;
        await Rating.findByIdAndUpdate({_id},{
            rating: req.body.ratingStar,
            comment: req.body.comment,
            statusRating: "rated",
            time: Date.now() 
        });
        return res.status(201).json({
            status: true
        })
    }
    catch(error){
        return res.status(500).json({
            message:"Error"
        })
    }
}
const getHistoryServicer = async(req,res)=>{
    try{
        var user = await getUserFromToken(req,res);
        console.log('a');
        var result= await Rating.find({driver:user.username});

        return res.status(201).json(
            result
        );
    }
    catch(error){
        return res.status(500).json({
            message:"Error"
        });
    }
}
const getRatingsOfServicer = async(req,res)=>{
    try{
        var user = await getUserFromToken(req,res);

        var result= await Rating.find({servicer:user.username});

        return res.status(201).json(
            result
        );

    }
    catch(error){
        return res.status(500).json({
            message:"Error"
        })
    }
}

module.exports={initRating,ratingServicer,getHistoryServicer, getRatingsOfServicer}