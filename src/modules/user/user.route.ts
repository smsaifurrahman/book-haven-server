import express from 'express';
import { UserControllers } from './user.controller';

import { UserValidations } from './user.validation';
import validateRequest from '../../app/middleware/validateRequest';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
