import { Request, Response } from 'express';

export type CustomRequest<Body, Query> = Request<Query, {}, Body>;

export type ResponseObject<Data> = {
  success: boolean;
  message: string;
  data: Data;
};

export type CustomResponse<Data> = Response<ResponseObject<Data>>;
