const {Schema,model}=require("mongoose");
const {_,UserData}= require("./user_model");
var DriverSchema=new Schema({
    idUser: String,
    address: {
        type:String,
        default: ""
    },
});
DriverSchema.add(UserData);
const DriverModel=model("driver",DriverSchema);
module.exports=DriverModel;