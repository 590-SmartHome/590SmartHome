import * as dotenv from 'dotenv';
dotenv.config()

const mongoConfig = {
  serverUrl: "mongodb://mongo:27017/",
  database: "Smart_Home",
};
export {mongoConfig};