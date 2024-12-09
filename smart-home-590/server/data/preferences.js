import { users } from "../config/mongoCollections.js";
import { userData } from "./index.js";
import { ObjectId } from "mongodb";
import { validateId, validatePreference, validateUpdatePreference } from "../helpers/validation.js";

const getAllPreferences = async (userId) => {
    userId = validateId(userId);
    const myUser = await userData.getUserById();
    const myPreferences = myUser.preferences;
    return myPreferences;
}

const getPreferenceById = async (preferenceId) => {
    preferenceId = validateId(preferenceId);
    const userCollection = await users();
    let myPreference = await userCollection.findOne(
        {
          "preferences._id": new ObjectId(preferenceId),
        },
        {
          projection: {
            _id: 0,
            "preferences.$": 1,
          },
        }
      );
      if (myPreference === null) throw "No preference with that id";
    return myPreference.preferences[0];
}

const createPreference = async (userId, preference) => {
    userId = validateId(userId);
    preference = validatePreference(preference);
    preference["_id"] = new ObjectId();

    const userCollection = await users();

    const updatedInfo = await userCollection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
            $addToSet: { preferences: preference },
        },
        { returnDocument: "after" }
    );
    if (!updatedInfo) {
        throw "could not create preference successfully";
    }
    return updatedInfo;
}

const updatePreference = async (preferenceId, preference) => {
    preferenceId = validateId(preferenceId);
    preference = validateUpdatePreference(preference);

    let myPreference = await getPreferenceById(preferenceId);
    let myUpdateObject = {};
    for (let [key, value] of Object.entries(myPreference)) {
        myUpdateObject[`preferences.$.${key}`] = value;
    }

    const userCollection = await users();
    const updateOne = await userCollection.findOneAndUpdate(
      { "preferences._id": new ObjectId(preferenceId) },
      {
        $set: myUpdateObject,
      },
      { returnDocument: "after" }
    );
    if (!updateOne) {
      throw "could not update preference successfully";
    }

    return updateOne;
}

const deletePreference = async (preferenceId) => {
    preferenceId = validateId(preferenceId);
    let myPreference = await getPreferenceById(preferenceId);
    const userCollection = await users();
    const deletedPreference = await userCollection.findOneAndUpdate(
      {
        "preferences._id": new ObjectId(preferenceId),
      },
      { $pull: { preferences: myPreference } },
      { returnDocument: "after" }
    );
    if (!deletedPreference) {
      throw `Could not delete preference with id of ${preferenceId}`;
    }
    return deletedPreference;
}

export default {getAllPreferences, getPreferenceById, createPreference, updatePreference, deletePreference}