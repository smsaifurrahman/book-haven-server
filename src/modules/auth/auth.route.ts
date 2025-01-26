import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidation, loginValidationSchema } from './auth.validation';
import validateRequest from '../../app/middleware/validateRequest';
import auth from '../../app/middleware/auth';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth('admin', 'user'),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
