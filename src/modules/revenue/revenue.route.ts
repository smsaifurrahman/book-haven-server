import express from 'express';
import { revenueController } from './revenue.controller';



const router = express.Router();

router.get('/orders/revenue',  revenueController.getRevenue);


export const revenueRoute = router