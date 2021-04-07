const Users = require("../models/user_model");
const bcrypt = require("bcryptjs");

const findById = async (req,res)=>{
    const user= Users.findById(req.params._id);
    if(!user){
        return res.status(201).json({
            message: "Không tồn tại.",
            success: false,
          });
    }
    else{
        let result={
            _id:user._id,
            username: user.username,
            address: user.address,
            rating: user.rating,
            phoneNumber: user.phoneNumber,
        }
        return res.status(201).json({
            ...result,
            success: true,
        });
    }
};

const updateUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(500).send("ID is required");
  } else {
    console.log(req.body);
    let checkPassword = req.body.password.substring(0,1);
    console.log(checkPassword);
    let password;
    if (checkPassword === "$") {
      password = req.body.password;
    } else {
      password = await bcrypt.hash(req.body.password, 11);
    }
    Users.updateOne(
      {
        _id: req.params.id,
      },
      {
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: password,
        address: req.body.address,
      },
      function (err) {
        if (err) return res.status(500).json(err);
        else {
          Users.find((err, result) => {
            if (err) {
              res.status(500).json(err);
            } else {
              res.json(result);
            }
          });
        }
      }
    );
  }
};
module.exports = { updateUser, deleteUser,findById };