import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const handleTokenError = (err: JsonWebTokenError | TokenExpiredError): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.name, // Specify the error's name or other context
      message: err.message, // Provide the error message
    },
  ];

  if (err.name === 'JsonWebTokenError') {
    
    const statusCode = 400;
    return {
      statusCode,
      message: 'You are not Authorized',
      errorSources,
    };
  } else if (err.name === 'TokenExpiredError') {
    const statusCode = 400;
    return {
      statusCode,
      message: 'Token has expired',
      errorSources,
    };
  }

  // Default fallback if error type is unexpected
  const statusCode = 500;
  return {
    statusCode,
    message: 'An unexpected error occurred',
    errorSources,
  };
};

export default handleTokenError;
