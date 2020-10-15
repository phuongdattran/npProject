const express = require("express");
const router = express.Router();
//const auth = require("../..//middleware/auth");

const userCtrl = require("../../controller/backend/user");

router.get('/user', userCtrl.getAllUser);

router.get('/user/:id', userCtrl.getOneUser);

router.get('/user/last/user', userCtrl.getLastUser);

router.put('/user/:id', userCtrl.updateUser);

router.delete('/user/:id', userCtrl.deleteUser);

router.post('/user/signup', userCtrl.createUser);
router.post('/user/signin', userCtrl.signin);

module.exports = router;