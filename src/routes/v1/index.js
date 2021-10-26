import express from 'express';
import { HttpStatusCode } from '~/utilities/constants';
import { boardRoutes } from './board.route';
// import { CardRoutes } from './card.route';
// import { columnRoutes } from './column.route';

const router = express.Router();

router.get('/status', (req, res) => {
  res.status(HttpStatusCode.OK).json({ status: 'ok' });
});

/** Board APIs */
router.use('/boards', boardRoutes);

// /** Column APIs */
// router.use('/columns', columnRoutes);

// /** Card APIs */
// router.use('/cards', CardRoutes);

export const apiV1 = router;
