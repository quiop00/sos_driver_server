const express=require("express");
const cors=require("cors");
const bodyParse=require("body-parser");
const {connect}=require("mongoose");
const {DB,PORT}=require("./config");
const passport=require("passport");
const {success,error}= require("consola");

const app=express();
//middlewares
app.use(cors());

app.use(bodyParse.json());

app.use(passport.initialize());

require("./middlewares/passport")(passport);

app.use("/api/users", require("./routes/users"));

app.use("/api/map",require("./routes/map"));



const startApp=async()=>{
    try{
        //connect db
     await connect(DB,{
        useFindAndModify:true,
        useUnifiedTopology:true,
        useNewUrlParser:true});
        success({
            message:"Success",
            badge:true
        });
        console.log("db connect");
        //start listening server
        app.listen(process.env.PORT || 3000);
    }catch(err){
        error({
            message:"Error",
            badge:true
        });
        startApp();       
    }
};
    
//run server
startApp();


