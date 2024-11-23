/** @format */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/book/book.routes';
import { OrderRoutes } from './modules/order/order.route';
import { revenueRoute } from './modules/revenue/revenue.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api', BookRoutes);
app.use('/api', OrderRoutes);
app.use('/api', revenueRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
