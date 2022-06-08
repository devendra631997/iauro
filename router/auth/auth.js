const { Router } = require('express');
const router = Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../../controllers/user/user');

router.post('/login', (req, res) => res.send('Welcome'))
router.post('/logout', (req, res) => res.send('Welcome'))
router.post('/forgetpass', (req, res) => res.send('Welcome'))

module.exports = router;