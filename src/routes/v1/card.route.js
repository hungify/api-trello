import express from 'express';
import { CardController } from '~/controllers/Card.controller';
import { CardValidation } from '~/validations/Card.validation';

const router = express.Router();

router
  .route('/')
  // .get((req, res) => {})
  .post(CardValidation.createNew, CardController.createNew);

router.route('/:id');
// .get((req, res) => {})
// .put(CardValidation.update, CardController.update);

export const CardRoutes = router;
