require('dotenv').config();
export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  APP_PORT: process.env.APP_PORT,
};
