import { users } from "../config/mongoCollections";

export const getAllUsers = async () => {
    const myUsers = await users();
    return myUsers;
}