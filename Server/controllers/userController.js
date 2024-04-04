const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { id, name, email, gender, domain, availability } = req.body;
    const user = new User({
      id,
      name,
      email,
      gender,
      domain,
      availability,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log("Error creating user", error);
    res.status(500).json({ message: error });
  }
};

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  try {
    const users = await User.find().skip(skip).limit(limit);
    res.status(200).json(users);
  } catch (error) {
    console.log("Error getting users", error);
    res.status(500).json({ message: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error getting user", error);
    res.status(500).json({ message: error });
  }
};

module.exports = { createUser, getUsers, getUserById };
