const Team = require("../models/Team");

const createTeam = async (req, res) => {
  try {
    const { name, users } = req.body;
    const team = new Team({
      name,
      users,
    });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTeam };
