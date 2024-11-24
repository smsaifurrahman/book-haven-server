import { model, Schema } from 'mongoose';
import { TBook } from './book.interface';

const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    category: {
      type: String,
      enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be a negative number'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock status is required'],
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  },
);

export const Book = model<TBook>('books', bookSchema);
