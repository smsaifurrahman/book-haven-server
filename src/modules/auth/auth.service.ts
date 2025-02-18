import httpStatus from 'http-status';

import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../app/errors/AppError';
import config from '../../app/config';
import bcrypt from 'bcrypt';

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
    userName: user.name,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '3d',
  });

  return accessToken;
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is already deleted
  if (!(await User.isPasswordMatched(payload.oldPassword, userData?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
