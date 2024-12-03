import {dbConnection} from "./mongoConnection.js";

const getCollection = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      let db = await dbConnection();
      _col = await db.collection(collection);
    }
    return _col;
  };
};

export const users = getCollection("users");
export const homes = getCollection("homes");
export const devices = getCollection("devices");
export const preferences = getCollection("preferences");