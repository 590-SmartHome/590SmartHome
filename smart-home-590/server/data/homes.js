import { homes } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {validateId, validateHome, validateUpdateHome, validateJoinHomeInfo } from "../helpers/validation.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 6;

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

const getHomesByUserId = async (userId) => {
    userId = validateId(userId);
    const homeCollection = await homes();
    const myHomes = await homeCollection.find({ users: {$all: [userId]} }).toArray();
    return myHomes;
}

const createHome = async (home) => {
    home = validateHome(home);
    home.devices = []
    home.users = []
    const homeCollection = await homes(); 

    const nameHome = await homeCollection.findOne({ name: home.name});
    if(nameHome) throw "home exists with that name";
    
    const hash = await bcrypt.hash(home.hashedPassword, SALT_ROUNDS)
    home.hashedPassword = hash;

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

const joinHome = async (login, userId) => {
    userId = validateId(userId);
    login = validateJoinHomeInfo(login);
    const homeCollection = await homes(); 
    const myHome = await homeCollection.findOne({ name: login.name});
    if(myHome){
        let confirmation = await bcrypt.compare(login.hashedPassword, myHome.hashedPassword)
        if (confirmation) {
            const updatedInfo = await homeCollection.findOneAndUpdate(
                { _id: myHome._id },
                { $addToSet: { users:  userId} },
                { returnDocument: "after" }
              );
              if (!updatedInfo) {
                throw "could not create device successfully";
            }
            return updatedInfo;
        }else{
            throw "incorrect password"
        }
    }else {
        throw "No home with that name"
    }
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


export default {joinHome, getHomesByUserId, getAllHomes, getHomeById, createHome, updateHome, deleteHome}