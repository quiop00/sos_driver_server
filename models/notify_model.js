const {Schema,model} =require("mongoose");

const NotifySchema= new Schema({
    title: String,
    isBookingType:{
        type: Boolean,
        default: false
    },
    isBooked:{
        type: Boolean,
        default: false
    },
    idUsers:[
        {
            idUser: String
        }
    ]
});

const Notify = model("notify",NotifySchema);
module.exports = Notify; 