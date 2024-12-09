import { homes } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { homeData } from "./index.js";
import { validateId, validateDevice, validateUpdateDevice } from "../helpers/validation.js";

const getAllDevices = async (homeId) => {
    homeId = validateId(homeId);
    const myHome = await homeData.getHomeById();
    const myDevices = myHome.devices;
    return myDevices;
}

const getDeviceById = async (deviceId) => {
    homeId = validateId(deviceId);
    const homeCollection = await devices();
    let myDevice = await homeCollection.findOne(
        {
          "devices._id": new ObjectId(deviceId),
        },
        {
          projection: {
            _id: 0,
            "devices.$": 1,
          },
        }
      );
      if (myDevice === null) throw "No device with that id";
    return myDevice.devices[0];
}

const createDevice = async (homeId, device) => {
    homeId = validateId(homeId);
    device = validateDevice(device);
    device["_id"] = new ObjectId();

    const homeCollection = await homes();

    const updatedInfo = await homeCollection.findOneAndUpdate(
        { _id: new ObjectId(homeId) },
        {
            $addToSet: { devices: device },
        },
        { returnDocument: "after" }
    );
    if (!updatedInfo) {
        throw "could not create device successfully";
    }
    return updatedInfo;
}

const updateDevice = async (deviceId, device) => {
    deviceId = validateId(deviceId);
    device = validateUpdateDevice(device);

    let myDevice = await getDeviceById(deviceId);
    let myUpdateObject = {};
    for (let [key, value] of Object.entries(myDevice)) {
        myUpdateObject[`devices.$.${key}`] = value;
    }

    const teamCollection = await teams();
    const updateOne = await teamCollection.findOneAndUpdate(
      { "devices._id": new ObjectId(deviceId) },
      {
        $set: myUpdateObject,
      },
      { returnDocument: "after" }
    );
    if (!updateOne) {
      throw "could not update device successfully";
    }

    return updateOne;
}

const deleteDevice = async (deviceId) => {
    deviceId = validateId(deviceId);
    let myDevice = await getDeviceById(deviceId);
    const homeCollection = await homes();
    const deletedDevice = await homeCollection.findOneAndUpdate(
      {
        "devices._id": new ObjectId(deviceId),
      },
      { $pull: { devices: myDevice } },
      { returnDocument: "after" }
    );
    if (!deletedDevice) {
      throw `Could not delete device with id of ${deviceId}`;
    }
    return deletedDevice;
}

export default {getAllDevices, getDeviceById, createDevice, updateDevice, deleteDevice}