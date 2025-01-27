import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/all-orders', OrderController.getAllOrders )
router.get('/:orderId', OrderController.getSingleOrder )

export const OrderRoutes = router;
