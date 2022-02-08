import express from 'express';
import { connectDB } from './config/mongodb';
import { apiV1 } from './routes/v1';
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from './config/cors';
import { env } from './config/environment';
require('dotenv').config();

connectDB()
  .then(() => console.log('Connected DB'))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/api/v1', apiV1);

  // app.get('/', (req, res) => {
  //   return res.status(200).json({
  //     status: 'Success',
  //     message:
  //       'The API Server is running!. Redirect to /api/v1 to see the API endpoints.',
  //   });
  // });

  const port = process.env.PORT || env.APP_PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
