const express = require("express");
const router = express.Router();
const User = require("../Models/Users");

router.get("/byUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get user by id
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ id: userId }); // Assuming "id" is the field name in your MongoDB documents
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get all users
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit);
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//insert a new user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    domain: req.body.domain,
    availability: req.body.availability || true,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update user
router.put("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.gender != null) {
    res.user.gender = req.body.gender;
  }
  if (req.body.domain != null) {
    res.user.domain = req.body.domain;
  }
  if (req.body.availability != null) {
    res.user.availability = req.body.availability;
  }

  try {
    const updateUser = await res.user.save();
    res.json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete user
router.delete(":id", getUser, async (res, req) => {
  try {
    await res.user.remove();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById({ id: req.params.id });
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
  res.user = user;
  next();
}

module.exports = router;
