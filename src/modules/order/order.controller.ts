import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  // const productId = orderData.product;
  // if (!mongoose.Types.ObjectId.isValid(productId)) {
  //   throw new Error('Invalid ID format | please provide a valid ObjectId ');
  // }

  const result = await OrderService.createOrderIntoDB(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created successfully!',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Order verified successfully",
    success: true,
    data: order,
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
  const result = await OrderService.getSingleOrderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved successfully!',
    data: result,
  });
});
const getMyOrder = catchAsync(async (req, res) => {
  const id = req.params.user_id;
  console.log('my order id', id);
  const result = await OrderService.getMyOrdersFromDB(id);
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
  getSingleOrder,
  verifyPayment,
  getMyOrder
};
