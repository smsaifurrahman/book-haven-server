import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin, USER_ROLE.user), OrderController.createOrder)
router.get('/', auth(USER_ROLE.admin, USER_ROLE.user), OrderController.verifyPayment)
router.get('/all-orders', OrderController.getAllOrders )
router.get('/:orderId', OrderController.getSingleOrder )

export const OrderRoutes = router;
