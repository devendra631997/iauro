const res = require('express/lib/response');
const User = require('../../database/models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function generateAccessToken(email) {
    // return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: email
    }, process.env.TOKEN_SECRET);
}


const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const { email, password } = req.body;
        const isUserExits = await User.exists({ email: email })
        if (!isUserExits) res.status(400).json({ Msg: "User does not exists" })
        const getUser = await User.findOne({ email: email })
        if (getUser.password !== password) res.send("passwoord is incorrect");
        // GENERATE A AUTH TOKEN. EVERY TIME NEW TOKEN
        const authToken = generateAccessToken(email)
        await User.findOneAndUpdate({ email: email, password: password }, { authToken: authToken })
        res.status(200).json({ Token: authToken })
    } catch (error) {
        res.send(error)
    }
};


module.exports = {
    loginUser
};