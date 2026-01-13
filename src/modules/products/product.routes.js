import express from 'express';
import { createProduct, fetchProductById, getProductList, updateProduct, softDeleteProduct } from './product.controller.js';

const router = express.Router();

router.get('/', getProductList);
router.post('/create', createProduct);
router.get('/get-product/:id', fetchProductById);
router.patch('/update-product', updateProduct);
router.post('/delete-product/:id', softDeleteProduct);

export default router;