import Joi from 'joi';

const params = Joi.object<{ id: string }>().keys({
  id: Joi.string().required().length(25),
});

export const globalValidators = { params };
