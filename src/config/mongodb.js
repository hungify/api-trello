import { env } from './environment';
const { MongoClient } = require('mongodb');

let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  dbInstance = client.db(env.DATABASE_NAME);

  // await listDatabases(client);
};

export const getDB = () => {
  if (!dbInstance) throw Error('Must connect to Database first !');
  return dbInstance;
};

// const listDatabases = async (client) => {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log('Your databases in this device');
//   databasesList.databases.forEach((db) => console.log(`${db.name}`));
// };
