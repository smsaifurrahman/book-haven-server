/** @format */

import express, { application, Application, Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/book/book.routes';
import { OrderRoutes } from './modules/order/order.route';

import { UserRoutes } from './modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/errors/notFound';
import { AuthRoutes } from './modules/auth/auth.route';
import router from './app/route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Application routes
// app.use('/api', BookRoutes);
// app.use('/api', OrderRoutes);
// app.use('/api', UserRoutes);
// app.use('/api', AuthRoutes);

app.use('/api', router)

app.use(globalErrorHandler);
app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
