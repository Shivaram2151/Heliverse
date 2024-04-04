const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const Team = require("../models/Team");

router.post("/registerTeam", teamController.createTeam);

// router.get("/getTeams", teamController.getTeams);

module.exports = router;
