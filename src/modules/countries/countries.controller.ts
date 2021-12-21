import type { Country } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import httpStatus from 'http-status';
import { countriesService } from './countries.service';
import type { CreateInput, UpdateInput } from './types';
import type { CustomRequest, CustomResponse } from '../../types/express';

export const create = asyncHandler(
  async (req: CustomRequest<CreateInput, {}>, res: CustomResponse<Country>) => {
    const country = await countriesService.create(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Successfully created new country!',
      data: country,
    });
  },
);

export const update = asyncHandler(
  async (
    req: CustomRequest<UpdateInput, { id: string }>,
    res: CustomResponse<Country>,
  ) => {
    const country = await countriesService.update({
      id: req.params.id,
      data: req.body,
    });

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Successfully updated country!',
      data: country,
    });
  },
);

export const remove = asyncHandler(
  async (
    req: CustomRequest<{}, { id: string }>,
    res: CustomResponse<string>,
  ) => {
    const { id } = req.params;

    await countriesService.remove(id);

    res.status(httpStatus.OK).json({
      success: true,
      message: `Successfully deleted country with the id of ${id}!`,
      data: id,
    });
  },
);

export const getOne = asyncHandler(
  async (
    req: CustomRequest<{}, { id: string }>,
    res: CustomResponse<Country>,
  ) => {
    const country = await countriesService.getOne(req.params.id);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Successfully fetched country!',
      data: country,
    });
  },
);

export const getAll = asyncHandler(
  async (_, res: CustomResponse<Country[]>) => {
    const countries = await countriesService.getAll();

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Successfully fetched all countries!',
      data: countries,
    });
  },
);

export const deleteAll = asyncHandler(async (_, res: CustomResponse<null>) => {
  await countriesService.deleteAll();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Successfully deleted all countries!',
    data: null,
  });
});
