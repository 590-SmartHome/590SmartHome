import { users } from "../config/mongoCollections.js";

const getAllUsers = async () => {
    const userCollection = await users();
    const myUsers = await userCollection.find({}).toArray();
    return myUsers;
}

export default {getAllUsers}