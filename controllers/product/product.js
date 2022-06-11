const res = require('express/lib/response');
const Product = require('../../database/models/product');
const User = require('../../database/models/user');
const { validationResult } = require('express-validator');

const getAllProducts = async (req, res, next) => {
    try {
        const isUserExits = await User.exists({ email: req.user.data })
        if (!isUserExits) return res.sendStatus(403)
        const userdata = await User.findOne({ email: req.user.data, authToken: req.token })
        if (userdata.isAdmin) {
            const products = await Product.find({})
            res.send(products)
        } else {
            const products = await Product.find({ addedBy: userdata.id })
            res.send(products)
        }
    } catch (error) {
        res.send(error)
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const isUserExits = await User.exists({ email: req.user.data })
        if (!isUserExits) return res.sendStatus(403)
        const user = await User.findOne({ email: req.user.data, authToken: req.token })
        if (user && user.isAdmin) {
            const products = await Product.findOne({ id: productId.replace(":", "") })
            if (!products) return res.status(402).json({ Msg: "product id doesn't associate with any product" })
            return res.send(products)
        } else if (user) {
            const products = await Product.findOne({ id: productId.replace(":", "") })
            if (!products) return res.status(402).json({ Msg: "This product id is not associate with any product" })
            if (products.addedBy != user.id) return res.status(403).json({ Msg: `you can see only those product which are added by you` })
            return res.send(products)
        }
    } catch (error) {
        res.send(error)
    }
};

const createProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const isUserExits = await User.exists({ email: req.user.data })
        if (!isUserExits) return res.sendStatus(403)
        const user = await User.findOne({ email: req.user.data })
        const product = {
            id: parseInt(Math.random() * 10000),
            name: req.body.name,
            addedBy: user.id
        }
        const createproducts = await Product.create(product)
        res.status(200).json({ Msg: createproducts })
    } catch (error) {
        res.send(error)
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const isUserExits = await User.exists({ email: req.user.data })
        if (!isUserExits) return res.sendStatus(403)
        const isProductExits = await Product.exists({ id: productId.replace(":", "") })
        if (!isProductExits) return res.status(400).json({ Msg: "Product does not exists" })
        const user = await User.findOne({ email: req.user.data })
        const product = await Product.findOne({ id: productId.replace(":", "") })
        if (!user.isAdmin && product.addedBy != user.id) return res.sendStatus(403)
        const deletingProduct = await Product.findOneAndDelete({ id: productId.replace(":", "") })
        res.status(200).json({ msg: `${productId} has been deleted` })
    } catch (error) {
        res.send(error)
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct
};