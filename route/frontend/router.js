const express = require("express");
const router = express.Router();
//const auth = require("../..//middleware/auth");

const homeCtrl = require("../../controller/frontend/home");
const userCtrl = require("../../controller/frontend/user");

router.get("/", homeCtrl.indexPage);
router.get("/home/", homeCtrl.homePage);

router.get("/signup", userCtrl.signupPage1);

module.exports = router;
