// routes/orderRoutes.js
import express from 'express';
import { createOrder, getUserOrders, getOrderById, updateOrderStatus, cancelOrder, addItemToOrder, removeItemFromOrder, getOrderStats } from '../controllers/orderController.js';
const router = express.Router();

router.post('/', createOrder);

router.get('/user/:userId', getUserOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', cancelOrder);
router.post('/:id/items', addItemToOrder);
router.delete('/:orderId/items/:itemId', removeItemFromOrder);
router.get('/stats/:userId', getOrderStats);


export default router;