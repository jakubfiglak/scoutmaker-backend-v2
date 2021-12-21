import Joi from 'joi';
import { CreateInput, UpdateInput } from './types';

const create = Joi.object<CreateInput>().keys({
  name: Joi.string().required().max(50),
  code: Joi.string().required().max(10),
});

const update = Joi.object<UpdateInput>().keys({
  name: Joi.string().max(50),
  code: Joi.string().max(10),
});

export const validators = { create, update };
