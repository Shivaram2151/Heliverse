const express = require("express");
const router = express.Router();
const Team = require("../Models/Teams");

router.post("/", async (req, res) => {
  const seletedUsersIds = req.body.userIds;
  try {
    const { users, name } = req.body;
    const team = new Team({
      name,
      users,
    });
    await team.save();
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// get team details by id
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
