import { RequestHandler } from 'express';

import { AdminServices } from './admin.service';
;
import  httpStatus  from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const blockUser: RequestHandler = catchAsync(async (req, res) => {
  const  userId  = req.params.userId;
  console.log(userId);
  await AdminServices.blockUserIntoDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is blocked Successfully',
  });
});

export const AdminController = {
  blockUser,
};
