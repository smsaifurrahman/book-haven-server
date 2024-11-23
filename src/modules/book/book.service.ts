import { TBook } from './book.interface';
import { Book } from './book.model';

const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);

  return result;
};

export const BookServices = {
  createBookIntoDB,
};
