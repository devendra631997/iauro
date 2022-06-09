const { Router } = require('express');
const router = Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/user/user');
const { check } = require('express-validator');

const { loginUser } = require("../controllers/auth/login")
const { logoutUser } = require("../controllers/auth/logout")

router.get('/', (req, res) => res.send('Welcome'))


// User Routes


router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.post('/users', [
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

router.put('/users', updateUser);
router.delete('/users',[
    check("userId","User id should be like 25ad28f2-487c-4951-9bc1-7668f02fd1b8").isLength({min:1})
], deleteUser);

// router.post('/Prooducts', controllers.createProoduct);
// router.get('/Prooducts', controllers.getAllProoducts);
// router.get('/Prooducts/:ProoductId', controllers.getProoductById);
// router.put('/Prooducts/:ProoductId', controllers.updateProoduct);
// router.delete('/Prooducts/:ProoductId', controllers.deleteProoduct);

// Auth Routes

router.post('/login', [
    check('email').isEmail(),
    check('password').isAlphanumeric()
], loginUser)
router.post('/logout', [
    check('email').isEmail(),
    check('password').isAlphanumeric()
], logoutUser)

router.get('*', function (req, res, next) {
    res.status(301).redirect('/not-found');
});



module.exports = router;


