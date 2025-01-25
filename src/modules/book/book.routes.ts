import express from 'express';
import { BookControllers } from './book.controller';

const router = express.Router();

router.post('/books', BookControllers.createBook);
router.get('/books', BookControllers.getAllBooks);
router.get('/books/:id', BookControllers.getSingleBook);
router.delete('/books/:id', BookControllers.deleteSingleBook);
router.put('/books/:id', BookControllers.updateBook);

export const BookRoutes = router;
