const express = require("express");
const router = express.Router();
//const auth = require("../..//middleware/auth");

const userCtrl = require("../../controller/backend/user");

router.get('/', userCtrl.getAllUser);

router.get('/:id', userCtrl.getOneUser);

router.post('/signup', userCtrl.createUser);

router.put('/:id', userCtrl.updateUser);

router.delete('/:id', userCtrl.deleteUser);

router.post('/signin', userCtrl.login);

module.exports = router;