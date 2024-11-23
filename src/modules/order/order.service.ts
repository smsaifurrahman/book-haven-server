import { Book } from "../book/book.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrderIntoDB = async (orderData: TOrder) => {
    const { product, quantity } = orderData;
  
    // Fetch the product details
    const book = await Book.findById(product);
  
    if (!book) {
      throw new Error("Product not found.");
    }
  
    // Check if there's enough stock
    if (book.quantity < quantity) {
      throw new Error("Insufficient stock to complete this order.");
    }
  
    // Reduce the quantity in the product model
    book.quantity -= quantity;
  
    // If the quantity reaches 0, update inStock to false
    if (book.quantity === 0) {
      book.inStock = false;
    }
  
    // Save the updated product
    await book.save();
  
    // Create the order
    const result = await Order.create(orderData);
  
    return result;
  };
  
  export const OrderService = {
    createOrderIntoDB,
  };