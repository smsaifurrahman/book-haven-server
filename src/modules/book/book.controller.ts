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
  } catch (err: unknown) {
    // Type assertion to Error
    const error = err as Error; // Assert that `err` is of type `Error`
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
      stack: error.stack,
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
      message: 'Something went wrong',
      error: err,
    });
  }
};

//   try {
//     const id = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new Error('Invalid ID format | please provide a valid ObjectId ');
//     }
//     const result = await BookServices.getSingleBookFromDB(id);

//      // If no book is found, send a 404 response
//      if (!result) {
//       res.status(404).json({
//         success: false,
//         message: 'Book not found',
//       });
//       return; // Return after sending response to avoid further execution
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Book is retrieved Successfully',
//       data: result,
//     });
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'Something went wrong',
//       error: err,
//     });
//   }
// };

const getSingleBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format | please provide a valid ObjectId ');
    }

    const result = await BookServices.getSingleBookFromDB(id);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (err: unknown) {
    // Type assertion to Error
    const error = err as Error; // Assert that `err` is of type `Error`
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
      stack: error.stack,
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

    // If no book is found, send a 404 response
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return; // Return after sending response to avoid further execution
    }

    res.status(200).json({
      success: true,
      message: 'Book is Updated Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: unknown) {
    // Type assertion to Error
    const error = err as Error; // Assert that `err` is of type `Error`
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
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

    // If no book is found, send a 404 response
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return; // Return after sending response to avoid further execution
    }

    res.status(200).json({
      status: true,
      message: 'Book is deleted Successfully',
      data: {},
    });
  } catch (err: unknown) {
    // Type assertion to Error
    const error = err as Error; // Assert that `err` is of type `Error`
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
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
