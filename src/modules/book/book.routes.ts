import express from 'express';
import { BookControllers } from './book.controller';

const router = express.Router();

router.post('/create-book', BookControllers.createBook);
router.get('/get-all-books', BookControllers.getAllBooks);
router.get('/get-single-book/:id', BookControllers.getSingleBook);
router.delete('/delete-book/:id', BookControllers.deleteSingleBook);
router.put('/update-book/:id', BookControllers.updateBook);

export const BookRoutes = router;
