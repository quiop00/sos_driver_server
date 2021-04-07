const router=require("express").Router();
const {User}= require("../models/user_model");
const {
    userAuth,
    userLogin,
    userRegister,
    checkRole,
    getUserFromToken
}= require("../utils/authentication");

router.get("",userAuth,checkRole(["driver"]),async(req,res)=>{
    User.find((err,users)=>{
        if (err) 
            res.status(500).json(err);
        else 
            res.json(users);
    });
});
router.get("/user",async(req,res)=>{
   var data=await getUserFromToken(req,res);
   return res.json(data);     

});
// Users Registeration Route
router.post("/register", async (req, res) => {
    await userRegister(req.body, res);
  });
  
  // Users Login Route
router.post("/login", async (req, res) => {
    await userLogin(req.body, res);
});

// router.get("/:id",async(req,res)=>{

// });

module.exports = router;