const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({dest: './uploads/'});

router.get('/', auth, sauceController.getAllSauces);
router.get('/:id', auth, sauceController.getOneSauce);
router.post('/', auth, upload.single('image'), sauceController.createSauce);
router.put('/:id', auth, upload.single('image'), sauceController.modifySauce);
//router.delete('/:id', auth, sauceController.deleteSauce);

module.exports = router;