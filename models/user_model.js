const {Schema, model}=require("mongoose");
const UserData={
    username: String,
    password: String,
    phoneNumber: String,
    role:{
        type: String,
        enum: ["driver","servicer"]
    },
    avatar: {
        type:String,
        default:"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"
    },
    currentPosition:{
        latitude: Number,
        longtitude: Number
    },
    isOnMap:{
        type: Boolean,
        default: false
    },
    
};
const UserSchema= new Schema(UserData);
const User=model("user",UserSchema);
module.exports= {User,UserData};
