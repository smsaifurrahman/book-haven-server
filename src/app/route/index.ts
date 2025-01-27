import { Router } from "express";
import { BookRoutes } from "../../modules/book/book.routes";
import { OrderRoutes } from "../../modules/order/order.route";
import { UserRoutes } from "../../modules/user/user.route";
import { AuthRoutes } from "../../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/users',
    route:  UserRoutes,
  },
  {
    path: '/auth',
    route:  AuthRoutes,
  },

 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;