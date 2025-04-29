const { Router } = require('express');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const productController = require('../controllers/product.controller');
const upload = require('../middlewares/upload');

const router = Router();

router.post('/', verifyToken, checkRole(['admin']), productController.createProduct);
router.post('/upload', verifyToken, checkRole(['admin']), upload.single("image"), productController.uploadImage);

module.exports = router;