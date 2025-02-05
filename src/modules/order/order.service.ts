import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { Book } from '../book/book.model';

import { Order } from './order.model';
import { IUser } from '../user/user.interface';
import { orderUtils } from './order.utils';

type orderedItems = {
  product: string;
  quantity: number;
};


let products : orderedItems [];
const createOrderIntoDB = async (
  user: IUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Book.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  let order = await Order.create({
    user,
    products: productDetails,
    totalPrice,
  });

  console.log('order', order);

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  console.log('payment', payment);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

// const getOrders = async () => {
//   const data = await Order.find();
//   return data;
// };

// const verifyPayment = async (order_id: string) => {
//   console.log(order_id);
//   const order = await Order.findById(order_id);

//   if (!order) {
//     throw new AppError(httpStatus.NOT_FOUND, "Order not found");
//   }

//   const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

//   if (verifiedPayment.length) {
//     const paymentStatus = verifiedPayment[0].bank_status;

//     await Order.findByIdAndUpdate(
//       order_id,
//       {
//         "transaction.bank_status": paymentStatus,
//         "transaction.sp_code": verifiedPayment[0].sp_code,
//         "transaction.sp_message": verifiedPayment[0].sp_message,
//         "transaction.transactionStatus": verifiedPayment[0].transaction_status,
//         "transaction.method": verifiedPayment[0].method,
//         "transaction.date_time": verifiedPayment[0].date_time,
//         status:
//           paymentStatus === "Success"
//             ? "Paid"
//             : paymentStatus === "Failed"
//             ? "Pending"
//             : paymentStatus === "Cancel"
//             ? "Cancelled"
//             : "",
//       },
//       { new: true }
//     );

//     // ✅ **Only reduce product stock if payment was successful**
//     if (paymentStatus === "Success") {
//       await Promise.all(
//         order.products.map(async (item) => {
//           await Book.findByIdAndUpdate(
//             item.product,
//             { $inc: { quantity: -item.quantity } },
//             { new: true }
//           );
//         })
//       );
//     }
//   }

//   return verifiedPayment;
// };

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    const paymentStatus = verifiedPayment[0].bank_status;
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );

        // ✅ **Only reduce product stock if payment was successful**
        if (paymentStatus === "Success") {
          await Promise.all(
            products.map(async (item) => {
              await Book.findByIdAndUpdate(
                item.product,
                { $inc: { quantity: -item.quantity } },
                { new: true }
              );
            })
          );
        }
  }


  return verifiedPayment;
};


// const verifyPayment = async (order_id: string) => {
//   const order = await Order.findById(order_id);

//   if (!order) {
//     throw new AppError(httpStatus.NOT_FOUND, "Order not found");
//   }

//   const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

//   if (verifiedPayment.length) {
//     const paymentStatus = verifiedPayment[0].bank_status;

//     await Order.findByIdAndUpdate(
//       order_id,
//       {
//         "transaction.bank_status": paymentStatus,
//         "transaction.sp_code": verifiedPayment[0].sp_code,
//         "transaction.sp_message": verifiedPayment[0].sp_message,
//         "transaction.transactionStatus": verifiedPayment[0].transaction_status,
//         "transaction.method": verifiedPayment[0].method,
//         "transaction.date_time": verifiedPayment[0].date_time,
//         status:
//           paymentStatus === "Success"
//             ? "Paid"
//             : paymentStatus === "Failed"
//             ? "Pending"
//             : paymentStatus === "Cancel"
//             ? "Cancelled"
//             : "",
//       },
//       { new: true }
//     );

//     // ✅ **Only reduce product stock if payment was successful**
//     if (paymentStatus === "Success") {
//       await Promise.all(
//         order.products.map(async (item) => {
//           await Book.findByIdAndUpdate(
//             item.product,
//             { $inc: { quantity: -item.quantity } },
//             { new: true }
//           );
//         })
//       );
//     }
//   }

//   return verifiedPayment;
// };





// const createOrderIntoDB = async (orderData: TOrder) => {
//   const { product, quantity } = orderData;

//   // Fetch the product details
//   const book = await Book.findById(product);

//   if (!book) {
//     throw new Error('Product not found.');
//   }

//   // Check if there's enough stock
//   if (book.quantity < quantity) {
//     throw new Error('Insufficient stock to complete this order.');
//   }

//   // Reduce the quantity in the product model
//   book.quantity -= quantity;

//   // If the quantity reaches 0, update inStock to false
//   if (book.quantity === 0) {
//     book.inStock = false;
//   }

//   // Save the updated product
//   await book.save();

//   // Create the order
//   const result = await Order.create(orderData);

//   return result;
// };




const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};
const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findOne({ _id: id });
  return result;
};
const getMyOrdersFromDB = async (userId: string) => {
  const result = await Order.find({ user: userId });
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  verifyPayment,
  getMyOrdersFromDB
};
