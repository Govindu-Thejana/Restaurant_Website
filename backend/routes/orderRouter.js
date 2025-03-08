// routes/orderRoutes.js
import express from 'express';
import { createOrder, getAllOrders, getUserOrders, getOrderById, updateOrderStatus, cancelOrder, addItemToOrder, removeItemFromOrder, getOrderStats } from '../controllers/orderController.js';
const router = express.Router();

router.post('/new', createOrder);
router.get('/', getAllOrders);
router.get('/user/:userId', getUserOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', cancelOrder);
router.get('/stats/:userId', getOrderStats);


export default router;