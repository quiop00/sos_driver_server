const {Schema,model}= require("mongoose");

const RatingSchema= new Schema({
    driver: String,
    servicer: String,
    time: {
        type: Date,
        default: Date.now()
    },
    rating:Number,
    comment: String,
    statusRating: {
        type: String,
        enum:["rated","none"],
        default: "none"
    },
});

const Rating= model("rating",RatingSchema);
module.exports= Rating;