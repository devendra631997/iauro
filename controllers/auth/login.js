const res = require('express/lib/response');
const User = require('../../database/models/user');
const { check, validationResult } = require('express-validator');
const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const { email, password } = req.body;
        const getUser = await User.findOne({ email: email });
        console.log(typeof (getUser), "GETUSER")
        if (getUser) res.send("error")
        if (getUser.password !== password) res.send("passwoord is incorrect");
        res.send(getUser)
    } catch (error) {
        res.send(error)
    }
};


module.exports = {
    loginUser
};