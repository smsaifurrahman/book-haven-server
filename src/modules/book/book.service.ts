import mongoose from 'mongoose';
import { TBook } from './book.interface';
import { Book } from './book.model';

const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);

  return result;
};

const getAllBooksFromDB = async (searchTerm: string | undefined) => {
  const filter: any = {};

  if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: 'i' } }, // Match title
      { author: { $regex: searchTerm, $options: 'i' } }, // Match author
      { category: { $regex: searchTerm, $options: 'i' } }, // Match category
    ];
  }

  const result = await Book.find(filter);
  return result;
};

const getSingleBookFromDB = async (id: string) => {
  const result = await Book.findById(id);

  return result;
};

const updateBookFromDB = async (id: string, data: TBook) => {
  const result = Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBookFromDB = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  deleteBookFromDB,
  updateBookFromDB,
};
