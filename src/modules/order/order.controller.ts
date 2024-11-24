import { Request, Response } from 'express';
import { OrderService } from './order.service';
import mongoose from 'mongoose';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const productId = orderData.product;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid ID format | please provide a valid ObjectId ');
    }
    console.log(orderData);
    const result = await OrderService.createOrderIntoDB(orderData);

    res.status(200).json({
      status: true,
      message: 'Order is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
};
