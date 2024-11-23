import { Request, Response } from "express";
import { OrderService } from "./order.service";



const createOrder = async (req: Request, res: Response) => {
    try {
      const orderData = req.body;
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
        stack: `Error: Something went wrong\n ${err.stack} `,
      });
    }
  };

  export const OrderController = {
    createOrder
  }