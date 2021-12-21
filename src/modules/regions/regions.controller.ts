import type { Region } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import httpStatus from 'http-status';
import { regionsService } from './regions.service';
import type { CreateInput, UpdateInput } from './types';
import type { CustomRequest, CustomResponse } from '../../types/express';

export const create = asyncHandler(
  async (req: CustomRequest<CreateInput, {}>, res: CustomResponse<Region>) => {
    const region = await regionsService.create(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Successfully created new region!',
      data: region,
    });
  },
);

export const update = asyncHandler(
  async (
    req: CustomRequest<UpdateInput, { id: string }>,
    res: CustomResponse<Region>,
  ) => {
    const region = await regionsService.update({
      id: req.params.id,
      data: req.body,
    });

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Successfully updated region!',
      data: region,
    });
  },
);

export const remove = asyncHandler(
  async (
    req: CustomRequest<{}, { id: string }>,
    res: CustomResponse<string>,
  ) => {
    const { id } = req.params;

    await regionsService.remove(id);

    res.status(httpStatus.OK).json({
      success: true,
      message: `Successfully deleted region with the id of ${id}!`,
      data: id,
    });
  },
);

export const getOne = asyncHandler(
  async (
    req: CustomRequest<{}, { id: string }>,
    res: CustomResponse<Region>,
  ) => {
    const region = await regionsService.getOne(req.params.id);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Successfully fetched region!',
      data: region,
    });
  },
);

export const getAll = asyncHandler(async (_, res: CustomResponse<Region[]>) => {
  const countries = await regionsService.getAll();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Successfully fetched all regions!',
    data: countries,
  });
});

export const deleteAll = asyncHandler(async (_, res: CustomResponse<null>) => {
  await regionsService.deleteAll();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Successfully deleted all regions!',
    data: null,
  });
});
