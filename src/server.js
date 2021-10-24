import express from 'express';
import { env } from './config/environment';
import { connectDB } from './config/mongodb';
import { apiV1 } from './routes/v1';
import morgan from 'morgan';

connectDB()
  .then(() => console.log('Connected DB'))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/api/v1', apiV1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log('Server running on ', `http://${env.APP_HOST}:${env.APP_PORT}`);
  });
};
