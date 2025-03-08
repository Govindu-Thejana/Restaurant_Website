// productRouter.js
import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, upload } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.single('image'), createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:productId', getProductById);
productRouter.put('/:productId', upload.single('image'), updateProduct);
productRouter.delete('/:productId', deleteProduct);

export default productRouter;