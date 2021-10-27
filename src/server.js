import express from 'express';
import { connectDB } from './config/mongodb';
import { apiV1 } from './routes/v1';
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from './config/cors';
import { env } from './config/environment';
connectDB()
  .then(() => console.log('Connected DB'))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/api/v1', apiV1);
  const port = env.APP_PORT || process.env.PORT;
  app.listen(port, () => {
    console.log('Server running on', `${port}`);
  });
};
