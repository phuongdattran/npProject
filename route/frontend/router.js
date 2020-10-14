const express = require("express");
const router = express.Router();
//const auth = require("../..//middleware/auth");

const homeCtrl = require("../../controller/frontend/home");
const userCtrl = require("../../controller/frontend/user");

router.get("/", homeCtrl.indexPage);
router.get("/home/", homeCtrl.homePage);

router.get("/signup", userCtrl.signupPage1);
router.post("/signup2", userCtrl.signupPage2);
router.post("/signup3", userCtrl.signupPage3);
router.get("/signin", userCtrl.signinPage);

router.get("/myprofile", userCtrl.myProfilePage)

module.exports = router;
