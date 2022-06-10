const res = require('express/lib/response');
const User = require('../../database/models/user');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const logoutUser = async (req, res) => {
    const { exp, data: email, iat } = req.user
    const token = req.token
    const isUserExits = await User.exists({ email: email, authToken: token })
    if (!isUserExits) res.status(400).json({ Msg: "Invalid Auth Token" })
    else {
        var user = await User.findOneAndUpdate({ email: email }, { authToken: "" })
        res.send(`${user.name} successfully logged out`)
    }
};


module.exports = {
    logoutUser
};