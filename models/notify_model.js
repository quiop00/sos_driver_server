const {Schema,model} =require("mongoose");

const NotifySchema= new Schema({
    title: String,
    type:{
        type: String,
        enum: ["sos","rated"],
        default: "sos"
    },
    user: [{
        username: String,
        status:{
            type: String,
            enum: ["Ok","Reject","None","rated"],
            default: "None"
        }
    }],
    time: {
        type: Date,
        default: Date.now
    },
    driver: String
});

const Notify = model("notify",NotifySchema);
module.exports = Notify; 