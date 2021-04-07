const {Schema,model}= require("mongoose");

const CommentSchema= new Schema({
    idUser: String,
    idCommenter: String,
    time: {
        type: Date,
        default: Date.now
    },
    rating: Number
});

const Comment= model("comment",CommentSchema);
module.exports= Comment;