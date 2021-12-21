import express from 'express';
import {
  create,
  update,
  getAll,
  deleteAll,
  getOne,
  remove,
} from '../modules/regions/regions.controller';
import { validate } from '../middleware/validate';
import { validators } from '../modules/regions/validators';
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
  .patch(update);

export default router;
