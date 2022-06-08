const res = require('express/lib/response');
const User = require('../../database/models/user');


const createUser = async (req, res) => {
  
};
const getAllUsers = async (req, res) => {
  await User.find({}).then(ele => {
    res.send(ele)
  }).catch(err =>{
    res.send(err)
  })
};
const getUserById = async (req, res) => {
  const { userId } = req.params;
  console.log(userId,"=")
  await User.find({id:1}).then(ele => {
    res.send(ele)
  }).catch(err =>{
    res.send(err)
  })
};
const updateUser = async (req, res) => {

};
const deleteUser = async (req, res) => {

};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};