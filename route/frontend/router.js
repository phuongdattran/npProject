const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const homeCtrl = require("../../controller/frontend/home");
const userCtrl = require("../../controller/frontend/user");
const eventCtrl = require("../../controller/frontend/event");
const membersCtrl = require("../../controller/frontend/members");
const myProfileCtrl = require("../../controller/frontend/myprofile");

router.get("/", homeCtrl.indexPage);
router.get("/home", homeCtrl.homePage);

router.get("/events", auth, eventCtrl.eventPage);
router.get("/newevent1", auth, eventCtrl.newEventPage1);
router.post("/newevent2", auth, eventCtrl.newEventPage2);
router.get("/event/:id", auth, eventCtrl.eventDetailPage);
router.get("/event/edit1/:id", auth, eventCtrl.eventEditPage1);
router.post("/event/edit2/:id", auth, eventCtrl.eventEditPage2);

router.get("/signup", userCtrl.signupPage1);
router.post("/signup2", userCtrl.signupPage2);
router.get("/signup3", userCtrl.signupPage3);
router.get("/signin", userCtrl.signinPage);
router.get("/signout", userCtrl.signOut);

router.get("/lostpwd", userCtrl.lostPwdPage);
router.get("/changepwd", auth, userCtrl.changePwdPage);

router.get("/members", auth, membersCtrl.membersPage);
router.get("/members/:id", auth, membersCtrl.memberProfilePage);

router.get("/myprofile", auth, myProfileCtrl.myProfilePage);
router.get("/dcstrava", auth, myProfileCtrl.dcStrava);
router.get("/editmyinfo", auth, myProfileCtrl.editMyInfoPage);
router.get("/following", auth, myProfileCtrl.followingPage);

module.exports = router;
