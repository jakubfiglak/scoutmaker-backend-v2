import express from 'express';
import {
  create,
  getAll,
  deleteAll,
  update,
  remove,
  getOne,
} from '../modules/countries/countries.controller';
import { validate } from '../middleware/validate';
import { validators } from '../modules/countries/validators';
import { globalValidators } from '../utils/globalValidators';

const router = express.Router();

router
  .route('/')
  .post(validate({ schema: validators.create, property: 'body' }), create)
  .get(getAll)
  .delete(deleteAll);

router
  .route('/:id')
  .all(validate({ schema: globalValidators.params, property: 'params' }))
  .get(getOne)
  .delete(remove)
  .patch(validate({ schema: validators.update, property: 'body' }), update);

export default router;
