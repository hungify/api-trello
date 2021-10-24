import express from 'express';
import { ColumnController } from '~/controllers/column.controller';
import { ColumnValidation } from '~/validations/column.validation';

const router = express.Router();

router
  .route('/')
  // .get((req, res) => {})
  .post(ColumnValidation.createNew, ColumnController.createNew);

router
  .route('/:id')
  // .get((req, res) => {})
  .put(ColumnValidation.update, ColumnController.update);

export const columnRoutes = router;
