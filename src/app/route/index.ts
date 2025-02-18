import { Router } from "express";
import { BookRoutes } from "../../modules/book/book.routes";
import { OrderRoutes } from "../../modules/order/order.route";
import { UserRoutes } from "../../modules/user/user.route";
import { AuthRoutes } from "../../modules/auth/auth.route";
import { AdminRoutes } from "../../modules/admin/admin.route";

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
  {
    path: '/admin',
    route:  AdminRoutes,
  },

 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;