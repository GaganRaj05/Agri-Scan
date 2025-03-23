const express = require('express');
const {handleLogin, handleRegistration} = require("../controller/auth");
const router = express.Router();

router.post("/register",handleRegistration),
router.post("/login",handleLogin);

module.exports = router;