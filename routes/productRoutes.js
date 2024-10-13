const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js"); 
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', productController.showProducts);
router.get('/dashboard', authMiddleware, productController.showProducts);

router.get('/products/T-shirt', productController.getProductsByCategory);
router.get('/products', productController.showProducts);
router.get('/products/Trousers', productController.getProductsByCategory);
router.get('/products/Shoes', productController.getProductsByCategory);
router.get('/products/Coats', productController.getProductsByCategory);
router.get('/products/Sweaters', productController.getProductsByCategory);

router.get('/products/:productId', productController.showProductById);

router.get('/dashboard/new', authMiddleware, productController.showNewProduct);
router.get('/dashboard/:productId', authMiddleware, productController.showProductById);

router.post('/dashboard', authMiddleware, productController.createProduct);

router.get('/dashboard/:productId/edit', authMiddleware, productController.showEditProduct);
router.put('/dashboard/:productId', authMiddleware, productController.updateProduct);

router.get('/dashboard/:productId/delete', authMiddleware, productController.deleteProduct); 
router.delete('/dashboard/:productId/delete', authMiddleware, productController.deleteProduct);

module.exports = router;