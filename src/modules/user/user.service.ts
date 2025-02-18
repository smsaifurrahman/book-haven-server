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

const getAllUsersFromDB = async (query: { page?: string }) => {
  // Pagination
  const page = Number(query?.page) || 1; // Default to page 1

  const limit = 4; // Default to 10 items per page
  const skip = (page - 1) * limit; // Calculate documents to skip
  const results = await User.find().skip(skip).limit(limit);
  const totalCount = await User.countDocuments();
  return {
    data: results, // Paginated results
    meta: {
      totalCount, // Total number of documents matching the filter
      totalPages: Math.ceil(totalCount / limit), // Total number of pages
      currentPage: page,
    },
  };
};

const getSingleUserFromDB = async (payload: IUser) => {
  const results = await User.isUserExitsByEmail(payload.email);
  return results;
};
const updateUserInfo = async (
  email: string,
  payload: { phone: string; city: string; address: string },
) => {
  const user = await User.isUserExitsByEmail(email);

  const result = await User.findOneAndUpdate(
    { email: user.email },
    { phone: payload.phone, city: payload.city, address:payload.address },
    {
      new: true,
    },
  );
  return result;
};

const blockUserIntoDB = async (id: string) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { isBlocked: true },
    {
      new: true,
    },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  blockUserIntoDB,
  getSingleUserFromDB,
  updateUserInfo
};
