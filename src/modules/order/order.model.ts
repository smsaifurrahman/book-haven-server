import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'books',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  },
);

// const orderSchema = new Schema<TOrder>(
//   {
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       match: [
//         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//         'Please provide a valid email address',
//       ],
//     },
//     product: {
//       type: String,
//       required: [true, 'Product (book) is required'],
//     },
//     quantity: {
//       type: Number,
//       required: [true, 'Quantity is required'],
//       min: [1, 'Quantity must be at least 1'],
//     },
//     totalPrice: {
//       type: Number,
//       required: [true, 'Total price is required'],
//       validate: {
//         validator: function (value: number) {
//           return value > 0;
//         },
//         message: 'Total price must be greater than 0',
//       },
//     },
//   },
//   {
//     timestamps: true, // Automatically adds `createdAt` and `updatedAt`
//   },
// );

export const Order = model<TOrder>('orders', OrderSchema);
