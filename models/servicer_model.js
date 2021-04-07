const {Schema,model} = require("mongoose");
const {_,UserData}= require("./user_model");
var ServicerSchema =new Schema({
    idUser: String,
    typeService: {
        type: String,
        enum: ["moto","car"]
    },
    currentRating: {
        type:Number,
        default: 0
    },
    numberRating: {
        type:Number,
        default: 0
    },
    priceList: {
       type: [
        {
            service:String,
            price: Number
        }
        ],
        default: []
    }
});
ServicerSchema.add(UserData);
const Servicer= model("servicer",ServicerSchema);

module.exports= Servicer;