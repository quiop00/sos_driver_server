  
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const {User,_} = require("../models/user_model");

const Driver =require("../models/driver_model");
const Servicer =require("../models/servicer_model");
const { SECRET } = require("../config");

const userRegister= async(userDesc,res)=>{
    try{
        //console.log(userDesc.username);
        let userNotRegister=await validateUsername(userDesc.username);
        if(!userNotRegister){
            return res.status(201).json({
                message: `Username đã tồn tại.`,
                success: false,
              });
        }
        const password = await bcrypt.hash(userDesc.password,11);

        console.log(password);
        // create a new user
        const newUser = new User({
            ...userDesc,
            password
        });
        //console.log(newUser);
        await newUser.save();
        if(userDesc.role=="driver"){
            const newDriver= new Driver({
                ...userDesc,
                password,
            });
            await newDriver.save();
        }else{
            const newServicer= new Servicer({
                ...userDesc,
                password
            });
            await newServicer.save();
        }
        console.log(" A");
        return res.status(201).json({
            message: "Đăng ký thành công, Vui lòng đăng nhập.",
            success: true,
        });
    }
    catch (err) {
        // Implement logger function (winston)
        return res.status(500).json({
          message: "Không thể tạo tài khoản.",
          success: false,
        });
      }
};

//auth login

const userLogin=async(userInfo,res)=>{
    let {username,password} = userInfo;

    //console.log(username+" "+password);
    const user=await User.findOne({username});
    //console.log(user);
    if(!user){
        return res.status(201).json({
            message: "Username không tồn tại.",
            success: false,
          });
    }

    let isMatch =  await bcrypt.compare(password,user.password); 
    
    if(isMatch){
        let token= jwt.sign(
            {
                user_id:user._id,
                username: user.username,
                role: user.role
            },
            SECRET,
            {expiresIn:"2 days"}
        );
        let result={
            _id:user._id,
            username: user.username,
            role: user.role,
            token: `Bearer ${token}`,
            expiresIn: 168
        }
        return res.status(201).json({
            ...result,
            message: "Bạn đã đăng nhập.",
            success: true,
          });
    }else{
        return res.status(201).json({
            message: "Mật khẩu không đúng.",
            success: false,
          });
    }

};

const userAuth = passport.authenticate("jwt", { session: false });

const checkRole = (roles) => (req, res, next) =>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token,SECRET, (err,user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
  }) 
    return !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorizedd")
    : next();
}
const getUserFromToken=(req,res)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token,SECRET, (err,user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
  }) 
  return req.user;
}
const validateUsername = async (username) => {
    let user = await User.findOne({username});
    console.log(user+" A");
    return user ? false : true;
};
module.exports = {
    userAuth,
    checkRole,
    userLogin,
    userRegister,
    getUserFromToken
  };