import express from 'express';
import { UserControllers } from './user.controller';

import { UserValidations } from './user.validation';
import validateRequest from '../../app/middleware/validateRequest';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from './user.constant';

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
router.get(
  '/get-single-user',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getSingleUser,
);
router.patch(
  '/block-user/:userId',
  UserControllers.blockUser,
);



export const UserRoutes = router;
