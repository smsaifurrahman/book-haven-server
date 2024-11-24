import { Request, Response } from 'express';
import { Order } from '../order/order.model';

const getRevenue = async (req: Request, res: Response) => {
  try {
    // Aggregation pipeline to calculate total revenue
    const result = await Order.aggregate([
      {
        $group: {
          _id: null, // Group all orders together
          totalRevenue: { $sum: '$totalPrice' }, // Sum the totalPrice field
        },
      },
    ]);

    // If no orders exist, return revenue as 0
    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      status: true,
      message: 'Revenue is retrieved successfully',
      data: { totalRevenue: revenue },
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

export const revenueController = {
  getRevenue,
};
