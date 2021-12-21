import Joi from 'joi';
import type { Prisma } from '@prisma/client';

const create = Joi.object<Prisma.RegionUncheckedCreateInput>().keys({
  name: Joi.string().required().max(50),
  countryId: Joi.string().required(),
});

export const validators = { create };
