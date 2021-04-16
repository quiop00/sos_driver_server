const Driver = require("../models/driver_model");
const Servicer = require("../models/servicer_model");
const {getUserFromToken}= require("./authentication");

const getFavourites =async (req,res)=>{
    try{
        var user =await getUserFromToken(req,res);
        if(!user){
            return res.status(201).json({
                message:'UnAuth'
            });
        } 
        var favouriteServicers=[];
        for(var i in user.favourites){
            var servicer = await Servicer.findOne({username: user.favourites[i]});
            var data={
                username: servicer.username,
                avatar: servicer.avatar,
                phoneNumber: servicer.phoneNumber
            } 
            favouriteServicers.push(data);
        }
        return res.status(201).json({
            data: favouriteServicers
        });

    }
    catch(err){
        return res.status(501).json({
            message: 'Error'
        });
    }
}
const setFavourite= async (req,res)=>{
    try{
        var user = await getUserFromToken(req,res);
        if(!user){
            return res.status(201).json({
                message:'UnAuth'
            });
        }
        await Driver.findOneAndUpdate({username:user.username},{"$push":{"favourite":req.body.servicer}});
        
        return res.status(201).json({
            status: "ok"
        });
    }
    catch(err){
        return res.status(501).json({
            message: 'Error'
        });
    }
}
module.exports={getFavourites, setFavourite};