const express = require("express");
const router = express.Router();
//const auth = require("../../middleware/auth");
const multer = require('../../middleware/multer-config');

const userCtrl = require("../../controller/backend/user");
const stravaCtrl = require("../../controller/backend/strava");
const eventCtrl = require("../../controller/backend/event");
const participantCtrl = require("../../controller/backend/participant");

router.get('/user', userCtrl.getAllUser);
router.get('/user/:id', userCtrl.getOneUser);
router.get('/user/last/user', userCtrl.getLastUser);
router.put('/user/:id', userCtrl.updateUser);
router.delete('/user/:id', userCtrl.deleteUser);

router.get('/strava', stravaCtrl.getAllStrava);
router.get('/strava/:id', stravaCtrl.getOneStrava);
router.post('/strava', stravaCtrl.createStrava);
router.put('/strava/:id', stravaCtrl.updateStrava);
router.delete('/strava/:id', stravaCtrl.deleteStrava);

router.post('/user/signup', userCtrl.createUser);
router.post('/user/signin', userCtrl.signin);

router.get('/event', eventCtrl.getAllEvent);
router.post('/newevent', multer, eventCtrl.createEvent);
router.get('/event/:id', eventCtrl.getOneEvent);
router.put('/event/:id', multer, eventCtrl.updateEvent);
router.delete('/event/:id', eventCtrl.deleteEvent);

router.get('/participant', participantCtrl.getAllParticipant);
router.get('/participant/:id', participantCtrl.getOneEventParticipant);
router.get('/participant/user/:userId', participantCtrl.getOneUserEvents);
router.post('/participant/:eventId', participantCtrl.createParticipant);
router.delete('/participant/:eventId', participantCtrl.deleteParticipant);

module.exports = router;