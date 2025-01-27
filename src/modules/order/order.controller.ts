import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { OrderService } from './order.service';
import mongoose from 'mongoose';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const productId = orderData.product;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid ID format | please provide a valid ObjectId ');
  }

  const result = await OrderService.createOrderIntoDB(orderData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created successfully!',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req, res) => {
  const id = req.params.orderId
  console.log('id', id);
  const result = await OrderService.getSingleOrderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved successfully!',
    data: result,
  });
});


export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder
};
