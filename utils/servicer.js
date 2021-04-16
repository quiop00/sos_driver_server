const Notify = require("../models/notify_model");
const { getUserFromToken } = require("./authentication");
const Driver = require("../models/driver_model");
const Servicer = require("../models/servicer_model");
const { initRating } = require("./rating");

const acceptSOS = async (req, res) => {
  try {
      var user = await getUserFromToken(req, res);
      var filter = {
          _id: req.body._id,
          type: "sos"
      }
      var data = await Notify.findOne(filter);
      if (!data)
          return res.status(201).json({
              status: false
          });
      var servicers = data.user;
      console.log(servicers);
      if (!servicers)
          return res.status(201).json({
              status: false
          });

      var update = [];
      for (var i in servicers) {
          if (servicers[i].username != user.username) {
              update.push({
                  username: servicers[i].username,
                  status: "Reject"
              });
          }
          else {
              update.push({
                  username: servicers[i].username,
                  status: "OK"
              });
          }
      }
      await Notify.findOneAndUpdate(filter, { "user": update });
      await initRating(user.username, data.driver, res);
      return res.status(201).json({
          message: "Đã đồng ý cứu hộ",
          status: true
      });
  } catch (error) {
      return res.status(500).json({
          status: false
      });
  }
}
const rejectSOS = async (req, res) => {
  try {
      var user = await getUserFromToken(req, res);
      var filter = {
          _id: req.body._id,
          type: "sos",
          "user.username": user.username
      }
      await Notify.updateOne(filter, { $set: { "user.$.status": "Reject" } });
      return res.status(201).json({
          message: "Đã từ chối cứu hộ",
          status: true
      });
  } catch (error) {
      return res.status(500).json({
          status: false
      });
  }
}
module.exports={acceptSOS, rejectSOS}