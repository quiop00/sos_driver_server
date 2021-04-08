const router=require("express").Router();
const {User}= require("../models/user_model");
const {updateUser,findByUsername,getProfile }= require("../utils/users");
const {
    userAuth,
    userLogin,
    userRegister,
    checkRole,
    getUserFromToken
}= require("../utils/authentication");
const { route } = require("./map");
// router.get("/user",async(req,res)=>{
//    var data=await getUserFromToken(req,res);
//    return res.json(data);     

// });
// Users Registeration Route
// router.get("",userAuth,checkRole(["driver"]),async(req,res)=>{
//     User.find((err,users)=>{
//         if (err) 
//             res.status(500).json(err);
//         else 
//             res.json(users);
//     });
// });
router.post("/register", async (req, res) => {
    await userRegister(req.body, res);
  });
  // Users Login Route
router.post("/login", async (req, res) => {
    await userLogin(req.body, res);
});

router.get("/profile",async(req,res)=>{
    await getProfile(req,res);
});

router.get("/detail",async(req,res)=>{
    console.log(req.param("username"));
    await findByUsername(req,res);
});

router.put("/update",async(req,res)=>{
    await updateUser(req,res);
});

module.exports = router;