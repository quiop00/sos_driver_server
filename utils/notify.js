const Notify = require("../models/notify_model");
const { getUserFromToken } = require("./authentication");
const Driver = require("../models/driver_model");
const Servicer = require("../models/servicer_model");
const { getUsersByDistance } = require("./map");
const getNotifies = async (req, res) => {
    try {
        var user =await getUserFromToken(req, res);
        if (!user) {
            return res.status(201).json("Not Found user");
        }
        var notifies = await Notify.find({ "user.username": user.username });
        var result = {
            notifies: notifies
        }
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({
            message: "Error.",
            success: false,
        });
    }
};
const pushNotifySOS = async(req,res) => {
    try {
        console.log('here');
        var user =await getUserFromToken(req, res);
        console.log('here');
        if (!user) {
            return res.status(201).json("Not Found user");
        }
        console.log('here');
        var servicers = await getUsersByDistance(req, res, user);
        console.log('here');
        if (servicers == null) {
            return res.status(201).json({
                message: "Không tìm thấy servicer nào quanh đây, hãy mở rộng khoảng cách tìm kiếm!",
                success: false
            })
        }
        var title = user.username + " đã phát tín hiệu SOS gần đây!";
        var servicerUsernames = [];

        for (var i in servicers) {
            servicerUsernames.push({
                username: servicers[i].username,
                status: "None"
            });
        }
        console.log(servicerUsernames);
        const notify = new Notify({
            title: title,
            user: servicerUsernames,
            driver: user.username
        });
        await notify.save();
        return res.status(201).json({
            message: "Phát tín hiệu SOS thành công",
            success: true
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error.",
            success: false,
        });
    }
};
module.exports = { getNotifies, pushNotifySOS }