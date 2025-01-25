import  httpStatus  from 'http-status';

import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import AppError from '../../app/errors/AppError';
import config from '../../app/config';



const loginUser = async (payLoad: TLoginUser) => {
  const user = await User.isUserExitsByEmail(payLoad.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  if (await User.isUserBlocked(user.email)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }
  if (!(await User.isPasswordMatched(payLoad?.password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '3d',
  });

  return accessToken;
};

export const AuthServices = {
  loginUser,
};
