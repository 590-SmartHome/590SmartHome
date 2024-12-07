import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { validateId, validateUpdateUser, validateUser } from "../helpers/validation.js";

const getAllUsers = async () => {
    const userCollection = await users();
    const myUsers = await userCollection.find({}).toArray();
    return myUsers;
}

const getUserById = async (id) => {
    id = validateId(id);
    const userCollection = await users();
    const myUser = await userCollection.findOne({ _id: new ObjectId(id) });
    if (myUser === null) throw "No user with that id";
    myUser._id = myUser._id.toString();
    return myUser;
}

const createUser = async (user) => {
    user = validateUser(user);
    user.homes = []
    user.preferences = []
    const userCollection = await users(); 
    const emailUser = await userCollection.findOne({ email: user.email});
    if(emailUser) throw "user exists with that email";
    const insertInfo = await userCollection.insertOne(user);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw "Could not add user";

    const newId = insertInfo.insertedId.toString();
    const newUser = await getUserById(newId);
    return newUser;
}

const updateUser = async (id, user) => {
    id = validateId(id);
    user = validateUpdateUser(user)
    const userCollection = await users();
    const updatedInfo = await userCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: user },
        { returnDocument: "after" }
      );

    if (!updatedInfo) {
        throw "could not update user successfully";
    }
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;
}

const deleteUser = async (id) => {
    id = validateId(id);
    const userCollection = await users();
    const deletionInfo = await userCollection.findOneAndDelete({
        _id: new ObjectId(id),
      });
    
    if (!deletionInfo) {
        throw `Could not delete user with id of ${id}`;
    }
    return deletionInfo;
}

export default {getAllUsers, getUserById, createUser, updateUser,  deleteUser}