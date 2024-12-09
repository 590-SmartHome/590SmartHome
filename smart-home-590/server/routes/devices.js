import {deviceData} from "../data/index.js";
import { validateId, validateDevice, validateUpdateDevice } from "../helpers/validation.js";
import express from "express";

const router = express.Router();

router
.route("/:homeId")
.get(async (req, res) => {
  try {
    const devices = await deviceData.getAllDevices(req.params.homeId);
    res.status(200).json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})
.post(async (req, res) => {
  let device = req.body
  if (!device || Object.keys(device).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  try {
    device = validateDevice(device);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    device = await deviceData.createDevice(req.params.homeId, device);
    res.status(200).json(device);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router
.route("/:id")
.get(async (req, res) => {
  try {
    req.params.id = validateId(req.params.id);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e });
  }
  try {
    const device = await deviceData.getDeviceById(req.params.id);
    return res.status(200).json(device);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
})
.put(async (req, res) => {
  try {
    req.params.id = validateId(req.params.id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const device = await deviceData.getDeviceById(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  let updateDevice = req.body;
  if (!updateDevice || Object.keys(updateDevice).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  try {
    updateDevice = validateUpdateDevice(updateDevice);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    const device = await deviceData.updateDevice(req.params.id, updateDevice);
    res.status(200).json(device);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})
.delete(async (req, res) => {
  try {
    req.params.id = validateId(req.params.id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const device = await deviceData.getDeviceById(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  try {
    const removedDevice = await deviceData.deleteDevice(req.params.id);
    return res.status(200).json({ _id: req.params.id, deleted: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

export default router;