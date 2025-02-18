import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { BookServices } from './book.service';
import mongoose from 'mongoose';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;
  // const zodParsedData = bookValidationSchema.parse(bookData);
  const result = await BookServices.createBookIntoDB(bookData);
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await BookServices.getAllBooksFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book data retrieved successfully',
    data: result,
  });
});

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

const getSingleBook = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
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

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  },
);

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format | please provide a valid ObjectId ');
  }
  const body = req.body;
  const result = await BookServices.updateBookFromDB(id, body);
  console.log(body);

  // If no book is found, send a 404 response
  if (!result) {
    res.status(404).json({
      success: false,
      message: 'Book not found',
    });
    return; // Return after sending response to avoid further execution
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is updated successfully',
    data: result,
  });
});

const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
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
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteSingleBook,
  updateBook,
};
