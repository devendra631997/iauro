const res = require('express/lib/response');
const User = require('../../database/models/user');
const { check, validationResult } = require('express-validator');

const logoutUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    const getUser = await User.findOne({ email: email });
    if (!getUser) res.send("User doesn't exist");
    if (getUser.password !== password) res.send("passwoord is incorrect");
    res.send(getUser)
};


module.exports = {
    logoutUser
};