const { Router } = require('express');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../../controllers/user/user');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);

router.post('/users', createUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

module.exports = router;