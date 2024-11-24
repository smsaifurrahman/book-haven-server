import { Request, Response } from 'express';
import { BookServices } from './book.service';
import mongoose from 'mongoose';

const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    // const zodParsedData = bookValidationSchema.parse(bookData);
    const result = await BookServices.createBookIntoDB(bookData);
    console.log(result);

    res.status(200).json({
      status: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
      stack: `Error: Something went wrong\n ${err.stack} `,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await BookServices.getAllBooksFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Books data retrieved Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format | please provide a valid ObjectId ');
    }
    const result = await BookServices.getSingleBookFromDB(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book is retrieved Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format | please provide a valid ObjectId ');
    }
    const body = req.body;
    const result = await BookServices.updateBookFromDB(id, body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Book is not found',
        data: result,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book is Updated Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const deleteSingleBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format | please provide a valid ObjectId ');
    }
    const result = await BookServices.deleteBookFromDB(id);
    console.log(result);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Book is not found',
        data: result,
      });
    }

    res.status(200).json({
      status: true,
      message: 'Book is deleted Successfully',
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteSingleBook,
  updateBook,
};
