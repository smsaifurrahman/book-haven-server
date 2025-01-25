import  httpStatus  from 'http-status';

import { AuthServices } from './auth.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successful',
    data: {
      token: result,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
