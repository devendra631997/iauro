const { Router } = require('express');
// const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

// router.post('/Prooducts', controllers.createProoduct);
// router.get('/Prooducts', controllers.getAllProoducts);
// router.get('/Prooducts/:ProoductId', controllers.getProoductById);
// router.put('/Prooducts/:ProoductId', controllers.updateProoduct);
// router.delete('/Prooducts/:ProoductId', controllers.deleteProoduct);

module.exports = router;