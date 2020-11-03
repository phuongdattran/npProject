const express = require("express");
const router = express.Router();
//const auth = require("../..//middleware/auth");

const homeCtrl = require("../../controller/frontend/home");
const userCtrl = require("../../controller/frontend/user");
const eventCtrl = require("../../controller/frontend/event");
const membersCtrl = require("../../controller/frontend/members");
const myProfileCtrl = require("../../controller/frontend/myprofile");

router.get("/", homeCtrl.indexPage);
router.get("/home", homeCtrl.homePage);

router.get("/events", eventCtrl.eventPage);
router.get("/newevent1", eventCtrl.newEventPage1);
router.post("/newevent2", eventCtrl.newEventPage2);
router.get("/event/:id", eventCtrl.eventDetailPage);
router.get("/event/edit1/:id", eventCtrl.eventEditPage1);
router.post("/event/edit2/:id", eventCtrl.eventEditPage2);

router.get("/signup", userCtrl.signupPage1);
router.post("/signup2", userCtrl.signupPage2);
router.get("/signup3", userCtrl.signupPage3);
router.get("/signin", userCtrl.signinPage);
router.get("/signout", userCtrl.signOut);

router.get("/lostpwd", userCtrl.lostPwdPage);
router.get("/changepwd", userCtrl.changePwdPage);

router.get("/members", membersCtrl.membersPage);
router.get("/members/:id", membersCtrl.memberProfilePage);

router.get("/myprofile", myProfileCtrl.myProfilePage);
router.get("/dcstrava", myProfileCtrl.dcStrava);
router.get("/editmyinfo", myProfileCtrl.editMyInfoPage);

module.exports = router;
