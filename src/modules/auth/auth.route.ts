import express from 'express';
import { AuthControllers } from './auth.controller';
import { loginValidationSchema } from './auth.validation';
import validateRequest from '../../app/middleware/validateRequest';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
