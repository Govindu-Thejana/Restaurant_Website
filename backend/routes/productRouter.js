import express from 'express';
import multer from 'multer';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const uploadMiddleware = multer({ storage: storage });

const productRouter = express.Router();

productRouter.post('/add', uploadMiddleware.single('image'), createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:productId', getProductById);
productRouter.put('/:productId', uploadMiddleware.single('image'), updateProduct);
productRouter.delete('/:productId', deleteProduct);

export default productRouter;
