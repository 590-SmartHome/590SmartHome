import { preferences } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { validateId, validatePreference, validateUpdatePreference } from "../helpers/validation.js";

const getAllPreferences = async () => {
    const preferenceCollection = await preferences();
    const myPreferences = await preferenceCollection.find({}).toArray();
    return myPreferences;
}

const getPreferenceById = async (id) => {
    id = validateId(id);
    const preferenceCollection = await preferences();
    const myPreference = await preferenceCollection.findOne({ _id: new ObjectId(id) });
    if (myPreference === null) throw "No preference with that id";
    myPreference._id = myPreference._id.toString();
    return myPreference;
}

const createPreference = async (preference) => {
    preference = validatePreference(preference);
    const preferenceCollection = await preferences(); 
    const insertInfo = await preferenceCollection.insertOne(preference);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw "Could not add preference";
    const newId = insertInfo.insertedId.toString();
    const newPreference = await getPreferenceById(newId);
    return newPreference;
}

const updatePreference = async (id, preference) => {
    id = validateId(id);
    preference = validateUpdatePreference(preference)
    const preferenceCollection = await preferences();
    const updatedInfo = await preferenceCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: preference },
        { returnDocument: "after" }
      );

    if (!updatedInfo) {
        throw "could not update preference successfully";
    }
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;
}

const deletePreference = async (id) => {
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

export default {getAllPreferences, getPreferenceById, createPreference, updatePreference, deletePreference}