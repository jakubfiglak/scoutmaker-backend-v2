import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import ApiError from '../utils/ApiError';

type ValidateArgs = {
  schema: Joi.ObjectSchema;
  property: 'body' | 'query' | 'params';
};

export function validate({ schema, property }: ValidateArgs) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (property === 'body') {
      const { error, value } = schema.validate(req.body);

      if (error) {
        return next(
          new ApiError(error.message, httpStatus.UNPROCESSABLE_ENTITY),
        );
      }

      req.body = value;
    } else {
      const { error } = schema.validate(req[property]);

      if (error) {
        return next(
          new ApiError(error.message, httpStatus.UNPROCESSABLE_ENTITY),
        );
      }
    }
    next();
  };
}
