const { MongoClient } = require('mongodb');
import { env } from '*/config/environment';

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    await listDatabases(client);
    console.log('Connected DB');
  } finally {
    await client.close();
  }
};

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases();
  console.log('Your databases in this device');
  databasesList.databases.forEach((db) => console.log(`${db.name}`));
};
