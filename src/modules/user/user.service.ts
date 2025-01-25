import httpStatus from 'http-status';

import AppError from '../../app/errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: IUser) => {
  const user = await User.isUserExitsByEmail(payload.email);
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This is User already exists');
  }

  const newUser = await User.create(payload);

  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};
