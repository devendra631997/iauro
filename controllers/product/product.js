const res = require('express/lib/response');
const Product = require('../../database/models/product');
const User = require('../../database/models/user');
const { validationResult } = require('express-validator');

const getAllProducts = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const isAdmin = await User.exists({ email: req.user.data, authToken: req.token, isAdmin: true })
        if (!isAdmin) return res.sendStatus(403)
        const products = Product.find({})
        res.send(products)
    } catch (error) {
        res.send(error)
    }
};


module.exports = {
    getAllProducts
};