const res = require('express/lib/response');
const User = require('../../database/models/user');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcryptjs');

const createUser = async (req, res, next) => {
  try {
    const id = uuidv4();
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { name, phoneNumber, email, password } = req.body;
    const isUserExist = await User.exists({ email: email })
    if (isUserExist) res.status(400).json({ Msg: "User already exists" })
    else {
      const userData = { id, name, phoneNumber, email, password }
      const user = await User.create(userData)
      res.status(200).json({ Msg: `Welcome ${user.name}, its your user Id ${user.id}` })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ "error": error })
  }
};

const getAllUsers = async (req, res) => {
  try {
    const isAdmin = await User.exists({ email: req.user.data, authToken: req.token, isAdmin: true })
  if (isAdmin) {
    await User.find({}).then(ele => {
      res.send(ele)
    }).catch(err => {
      res.send(err)
    })
  }
  else {
    res.status(401).send("Forbidden")
  }
  } catch (error) {
    res.status(500).json({ Msg: error })
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const isUserExits = await User.exists({ id: userId.replace(":", "") })
    if (!isUserExits) res.status(400).json({ Msg: "User does not exists" })
    res.send(await User.find({ id: userId.replace(":", "") }, { name: 1, email: 1, phoneNumber: 1, isAdmin: 1 }))
  } catch (error) {
    res.status(500).json({ Msg: error })
  }
};
const updateUser = async (req, res) => {
  try {
    const isAdmin = await User.exists({ email: req.user.data, authToken: req.token, isAdmin: true })
    if (isAdmin) {
      const updateUser = req.body
      const isUserExits = await User.exists({ id: userId })
      if (!isUserExits) res.status(400).json({ Msg: "User does not exists" })
      var isUserUpdated = await User.findOneAndUpdate({ id: userId.replace(":", "") }, updateUser)
      res.send()
    }
    else {
      res.status(401).send("Forbidden")
    }
  } catch (error) {
    res.status(500).json({ Msg: error })
  }
};
const deleteUser = async (req, res) => {
  try {
    // NEED TO ADD PERMISSION ONLY ADMIN CAN DELETE THE USERS
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const isAdmin = await User.exists({ email: req.user.data, authToken: req.token, isAdmin: true })
    if (isAdmin) {
      const { userId } = req.body;
      const isUserExits = await User.exists({ id: userId })
      if (!isUserExits) res.status(400).json({ Msg: "User does not exists" })
      const isUserRemoved = await User.findOneAndRemove({ id: userId })
      res.status(200).send(isUserRemoved)
    }
    else {
      res.status(401).send("Forbidden")
    }
  } catch (error) {
    res.status(500).json({ Msg: error })
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};