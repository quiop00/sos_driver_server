const router=require("express").Router();
const {
    userAuth,
    checkRole,
}= require("../utils/authentication");
const {
    updateLocation,
    getListByDistance
}=require("../utils/map");
// Users Registeration Route
router.post("/update-location", async (req, res) => {
    await updateLocation(req, res);
  });
  
  // Users Login Route
router.get("", async (req, res) => {
    await getListByDistance(req,res);
});

// router.get("/:id",async(req,res)=>{

// });

module.exports = router;