const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const User = require("../models/User");

router.post("/registerUser", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUser/:id", userController.getUserById);

module.exports = router;
