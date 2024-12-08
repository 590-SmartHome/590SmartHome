import * as dotenv from 'dotenv';
dotenv.config()

const mongoConfig = {
  serverUrl: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/`,
  database: process.env.MONGO_DBNAME,
};
export {mongoConfig};