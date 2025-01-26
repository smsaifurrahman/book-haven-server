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

const getAllUsersFromDB =async() => {
  const results = await User.find();
  return results
}


const blockUserIntoDB = async (id: string) => {
  const result = await User.findOneAndUpdate({ _id: id }, {isBlocked: true}, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  blockUserIntoDB
};
