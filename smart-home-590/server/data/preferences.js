import { preferences } from "../config/mongoCollections.js";

const getAllPreferences = async () => {
    const preferenceCollection = await preferences();
    const myPreferences = await preferenceCollection.find({}).toArray();
    return myPreferences;
}

export default {getAllPreferences}