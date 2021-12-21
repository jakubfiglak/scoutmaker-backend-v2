import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) {
  let error = { ...err };

  error.message = err.message;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      error = new ApiError(
        'There is a unique constraint violation, new entity cannot be created.',
        httpStatus.BAD_REQUEST,
      );
    }

    if (err.code === 'P2025') {
      error = new ApiError(
        Object.values(err?.meta).join(' ') ||
          'Unable to find a record with the given id',
        httpStatus.BAD_REQUEST,
      );
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    error = new ApiError(
      'There is a validation error, new entity cannot be created.',
      httpStatus.BAD_REQUEST,
    );
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: error.message || 'Server Error',
  });
}
