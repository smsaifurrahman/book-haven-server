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

router.get(
  '/get-all-users',
  UserControllers.getAllUsers,
);
router.patch(
  '/block-user/:userId',
  UserControllers.blockUser,
);



export const UserRoutes = router;
