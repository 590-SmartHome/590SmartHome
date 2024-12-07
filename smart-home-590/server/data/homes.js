import { homes } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {validateId, validateHome, validateUpdateHome } from "../helpers/validation.js";

const getAllHomes = async () => {
    const homeCollection = await homes();
    const myHomes = await homeCollection.find({}).toArray();
    return myHomes;
}

const getHomeById = async (id) => {
    id = validateId(id);
    const homeCollection = await homes();
    const myHome = await homeCollection.findOne({ _id: new ObjectId(id) });
    if (myHome === null) throw "No home with that id";
    myHome._id = myHome._id.toString();
    return myHome;
}

const createHome = async (home) => {
    home = validateHome(home);
    home.devices = []
    home.users = []
    const homeCollection = await homes(); 
    const insertInfo = await homeCollection.insertOne(home);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw "Could not add home";

    const newId = insertInfo.insertedId.toString();
    const newHome = await getHomeById(newId);
    return newHome;
}

const updateHome = async (id, home) => {
    id = validateId(id);
    home = validateUpdateHome(home)
    const homeCollection = await homes();
    const updatedInfo = await homeCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: home },
        { returnDocument: "after" }
      );

    if (!updatedInfo) {
        throw "could not update home successfully";
    }
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;
}


const deleteHome = async (id) => {
    id = validateId(id);
    const homeCollection = await homes();
    const deletionInfo = await homeCollection.findOneAndDelete({
        _id: new ObjectId(id),
      });
    if (!deletionInfo) {
        throw `Could not delete home with id of ${id}`;
    }
    return deletionInfo;
}


export default {getAllHomes, getHomeById, createHome, updateHome, deleteHome}