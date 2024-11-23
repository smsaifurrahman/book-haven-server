import express from 'express';
import { BookControllers } from './book.controller';

const router = express.Router();

router.post('/products', BookControllers.createBook);
router.get('/products', BookControllers.getAllBooks);
router.get('/products/:id', BookControllers.getSingleBook);
router.delete('/products/:id', BookControllers.deleteSingleBook);
router.put('/products/:id', BookControllers.updateBook);

export const BookRoutes = router;
