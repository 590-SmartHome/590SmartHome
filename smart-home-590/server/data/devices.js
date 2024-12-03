import { devices } from "../config/mongoCollections.js";

const getAllDevices = async () => {
    const deviceCollection = await devices();
    const myDevices = await deviceCollection.find({}).toArray();
    return myDevices;
}

export default {getAllDevices}