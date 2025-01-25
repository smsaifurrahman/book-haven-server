import { User } from './../modules/user/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config';


export const addAuthorInfo = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenBearer = req.headers.authorization;
    const token = tokenBearer?.split(' ')[1];
    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // console.log(decoded);
    const user = await User.findOne({ email: decoded.userEmail });

    const author = user?._id;
    req.body.author = author;
    

    next();
  });
};
