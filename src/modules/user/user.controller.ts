import httpStatus from 'http-status';
import { RequestHandler } from 'express';

import { UserServices } from './user.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Users data retrieved successfully',
    data: result,
  });
})
const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await UserServices.getSingleUserFromDB(user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User data retrieved successfully',
    data: result,
  });
});

const blockUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await UserServices.blockUserIntoDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is blocked Successfully',
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  blockUser,
  getSingleUser
};
