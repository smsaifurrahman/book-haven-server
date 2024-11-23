import { Request, Response } from 'express';
import { BookServices } from './book.service';

const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const result = await BookServices.createBookIntoDB(bookData);
    console.log(result);

    res.json({
      status: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (err) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const BookControllers = {
  createBook,
};
