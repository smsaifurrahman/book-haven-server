import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../../modules/user/user.interface';
import { User } from '../../modules/user/user.model';

const auth = (...requireRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const tokenBearer = req.headers.authorization;

    const token = tokenBearer?.split(' ')[1];


    // check if the token is sent from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail } = decoded;
   
    // checking if the user exists!
    const user = await User.isUserExitsByEmail(userEmail);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This User is not found');
    }

    // checking if the User is blocked

    if (await User.isUserBlocked(user.email)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is blocked');
    }

    if (requireRoles && !requireRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // req.user = decoded as JwtPayload & { role: string };
    req.user = user;

    next();
  });
};

export default auth;
