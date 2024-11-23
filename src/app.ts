/** @format */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/book/book.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/books', BookRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
