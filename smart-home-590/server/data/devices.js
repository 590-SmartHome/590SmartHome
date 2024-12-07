import { devices } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { validateId, validateDevice, validateUpdateDevice } from "../helpers/validation.js";

const getAllDevices = async () => {
    const deviceCollection = await devices();
    const myDevices = await deviceCollection.find({}).toArray();
    return myDevices;
}

const getDeviceById = async (id) => {
    id = validateId(id);
    const deviceCollection = await devices();
    const myDevice = await deviceCollection.findOne({ _id: new ObjectId(id) });
    if (myDevice === null) throw "No device with that id";
    myDevice._id = myDevice._id.toString();
    return myDevice;
}

const createDevice = async (device) => {
    device = validateDevice(device);
    const deviceCollection = await devices(); 
    const insertInfo = await deviceCollection.insertOne(device);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw "Could not add device";

    const newId = insertInfo.insertedId.toString();
    const newDevice = await getDeviceById(newId);
    return newDevice;
}

const updateDevice = async (id, device) => {
    id = validateId(id);
    device = validateUpdateDevice(device)
    const deviceCollection = await devices();
    const updatedInfo = await deviceCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: device },
        { returnDocument: "after" }
      );

    if (!updatedInfo) {
        throw "could not update device successfully";
    }
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;
}


const deleteDevice = async (id) => {
    id = validateId(id);
    const deviceCollection = await devices();
    const deletionInfo = await deviceCollection.findOneAndDelete({
        _id: new ObjectId(id),
      });
    
    if (!deletionInfo) {
        throw `Could not delete device with id of ${id}`;
    }
    return deletionInfo;
}

export default {getAllDevices, getDeviceById, createDevice, updateDevice, deleteDevice}