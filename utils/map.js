const { getUserFromToken } = require("./authentication");
const Driver = require("../models/driver_model");
const Servicer = require("../models/servicer_model");
const updateLocation = async (req, res) => {
    try {
        var user = await getUserFromToken(req, res);
    
        if (!user) {
            return res.status(201).json("Not Found user");
        }
        const filter = { username: user.username };
        const updateData = {
            currentPosition: req.body.currentPosition,
            isOnMap: req.body.isOnMap
        };
        console.log(filter);
        console.log(updateData);
        if (user.role == "driver") {
            await Driver.findOneAndUpdate(filter, updateData);
        }
        if (user.role == "servicer") {
            await Servicer.findOneAndUpdate(filter, updateData);
        }
        return res.status(201).json({
            message: "OK",
            success: true,
          });
    }
    catch (e) {
        return res.status(500).json({
            message: "Error.",
            success: false,
        });
    }
}
const getListByDistance = async (req, res) => {
    try {
        var user = await getUserFromToken(req, res);
        if (!user) {
            return res.status(201).json("Not Found user");
        }
        //var list;
        var filter = [];
        var result;
        filter=await getUsersByDistance(req,res,user);
        console.log(filter);
        if (user.role == "driver") {
            result={
                servicers: filter
            }
        }
        if (user.role == "servicer") {
            result={
                drivers: filter
            }
            
        }
        return res.status(201).json({
            ...result,
            message: "OK",
            success: true,
          });
    }
    catch (e) {
        return res.status(500).json({
            message: "Error.",
            success: false,
        });
    }
}

const getUsersByDistance= async(req,res,user)=>{
    var list;
    var filter = [];
    if (user.role == "servicer") {
        var datas = await Servicer.findOne({ username: user.username });
        list = await Driver.find();
        for(var data in list){
            console.log(list[data]);
            if(!list[data]["isOnMap"])
                continue;  
            var latitude = list[data]["currentPosition"]["latitude"];
            var longtitude = list[data]["currentPosition"]["longtitude"];
            var distance=getDistanceFromLatLonInKm(
                datas["currentPosition"]["latitude"],
                datas["currentPosition"]["longtitude"],
                latitude,longtitude);    
            console.log(req.body.distance);    
            if (req.body.distance >= distance) {
                    filter.push(list[data]);
            }
        };
        return filter;
    }
    if (user.role == "driver") {
        var datas = await Driver.findOne({ username: user.username });
        //console.log(datas+" A");
        list = await Servicer.find();
        //console.log(list);
        //console.log()
        for(var data in list){
            //console.log(list[data]);
            if(!list[data]["isOnMap"])
                continue;
            //console.log("here");    
            var latitude = list[data]["currentPosition"]["latitude"];
            var longtitude = list[data]["currentPosition"]["longtitude"];
            //console.log(latitude);
            //console.log(datas["currentPosition"]["latitude"]);
            var distance=getDistanceFromLatLonInKm(
                datas["currentPosition"]["latitude"],
                datas["currentPosition"]["longtitude"],
                latitude,longtitude);       
            if (req.body.distance >= distance) {
                    filter.push(list[data]);
            }
        };
        //console.log("ss"+filter+"AA");
        return filter;
    }
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

    console.log(lat1+":"+lon1+" - "+ lat2+":"+lon2);
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    console.log("here1");
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    console.log("here2");
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log("here3");
    console.log(d);
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}


module.exports={updateLocation,getListByDistance,getUsersByDistance}