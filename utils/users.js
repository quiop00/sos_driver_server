const Driver = require("../models/driver_model");
const Servicer = require("../models/servicer_model");
const { User } = require("../models/user_model");
const { getUserFromToken } = require("./authentication");
const bcrypt = require("bcryptjs");

const findByUsername = async (req, res) => {
  try {
    var info = await Driver.findOne({ username: req.param("username") });
    if (!info) {
      info = await Servicer.findOne({ username: req.param("username") });
      if (!info)
        return res.status(201).json({
          message: "Không tồn tại.",
          success: false,
        });
    }
    var data = {
      username: info.username,
      avatar: info.avatar,
      phoneNumber: info.phoneNumber,
    };
    if(info.role=="driver"){
       data["address"]= info.address;
    }
    else{
       data["priceList"]= info.priceList;
       data["typeService"]= info.typeService;
       data["currentRating"]= info.currentRating;
       data["numberRating"]=info.numberRating;
    }
    return res.status(201).json({
       infoUser : data
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error.",
      success: false,
    });
  }

};
const getProfile = async (req, res) => {
  try {
    var user = await getUserFromToken(req, res);
    if (!user) {
      return res.status(201).json("Not Found user");
    }
    var info = await Driver.findOne({ username: user.username });
    if (!info) {
      info = await Servicer.findOne({ username: user.username });
      if (!info)
        return res.status(201).json({
          message: "Không tồn tại.",
          success: false,
        });
    }
    // let result = {
    //   data: info
    // }
    console.log("herer");
    return res.status(201).json({
      data: info,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error.",
      success: false,
    });
  }

};

const updateUser = async (req, res) => {
  pass = await bcrypt.hash(req.body.password, 11);

  var user = await getUserFromToken(req, res);

  if (!user) {
    return res.status(201).json("Not Found user");
  }
  const filter = { username: user.username };

  console.log(filter);
  if (user.role == "driver") {
    const updateData = {
      password: pass,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address
    };
    await Driver.findOneAndUpdate(filter, updateData);
  }
  if (user.role == "servicer") {
    const updateData = {
      password: pass,
      phoneNumber: req.body.phoneNumber,
      typeService: req.body.typeService,
      priceList: req.body.priceList
    };
    await Servicer.findOneAndUpdate(filter, updateData);
  }
  await User.findOneAndUpdate(filter, { password: pass });
  return res.status(201).json({
    message: "OK",
    success: true,
  });


};

// const deleteUser = async (req, res) => {
//   console.log(req.params.id);
//   Users.deleteOne(
//     {
//       _id: req.params.id,
//     },
//     (err) => {
//       if (err) {
//         return res.status(500).json(err);
//       } else {
//         Users.find((err, result) => {
//           if (err) {
//             res.status(500).json(err);
//           } else {
//             res.json(result);
//           }
//         });
//       }
//     }
//   );
// };
module.exports = { updateUser, findByUsername ,getProfile};