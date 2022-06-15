const { Router } = require('express');
const router = Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/user/user');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
    , } = require('../controllers/product/product');
const { check, body } = require('express-validator');


const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        req.token = token
        next()
    })
}

const { loginUser } = require("../controllers/auth/login")
const { logoutUser } = require("../controllers/auth/logout")

router.get('/', (req, res) => res.send('Welcome'))

// User Routes

router.get('/users', authenticateToken, getAllUsers);

router.get('/users/:userId', authenticateToken, getUserById);

router.post('/users',  [
    check('name').isAlphanumeric().isLength({ min: 3, max: 20 }),
    check('phoneNumber', 'Mobile number should contains 10 digits').isMobilePhone().isLength(10),
    check('email').isEmail(),
    check("password", `Password should be combination of one uppercase,
     one lower case, one special char, one digit and min 8, max 50 char long`)
        .isLength({ min: 8, max: 50 })
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
        )
], createUser);

router.put('/users/:userId', authenticateToken,
    [
        check('name').optional({ checkFalsy: true, nullable: true }).isLength({ min: 3 }).withMessage('Please enter minimum 10 characters'),
        check('password').optional({ checkFalsy: true, nullable: true }).isLength({ min: 8, max: 50 })
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
            ).withMessage(`Password should be combination of one uppercase,
            one lower case, one special char, one digit and min 8, max 50 char long`)
    ], updateUser);

router.delete('/users', authenticateToken, [
    check("userId", "User id should be like 25ad28f2-487c-4951-9bc1-7668f02fd1b8").isLength({ min: 1 }),
], deleteUser);

// Products Route

router.get('/products/:productId', authenticateToken, getProductById);

router.get('/products', authenticateToken, getAllProducts);
router.post('/products', authenticateToken, [
    check("name", "Length of name should be graeter than 4").isLength({ min: 4 }),
], createProduct);

router.put('/products/:productId', authenticateToken, [
    check("name", "Length of name should be graeter than 4").isLength({ min: 4 }),
], updateProduct);

router.delete('/products/:productId', authenticateToken, deleteProduct);

// Auth Routes

router.post('/login', [
    check('email').isEmail(),
    check('password')
], loginUser)

router.post('/logout', authenticateToken, logoutUser)

router.get('*', function (req, res, next) {
    res.status(301).redirect('/not-found');
});



module.exports = router;


