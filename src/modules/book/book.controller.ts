import { Request, Response } from 'express';
import { BookServices } from './book.service';
import { any } from 'zod';

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
  } catch (err: any) {
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
  } catch (err: any) {
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
    const result = await BookServices.getSingleBookFromDB(id);
    if(!result) {
      res.status(400).json({
        success: true,
        message: 'Book is not found',
        data: result,
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
    const body = req.body;
    const result = await BookServices.updateBookFromDB(id, body);
    console.log(result);

    if(!result) {
      res.status(400).json({
        success: true,
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

const deleteSingleBook = async (req: Request, res: Response)  => {
  try {
    const id = req.params.id;
    await BookServices.deleteBookFromDB(id);

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
