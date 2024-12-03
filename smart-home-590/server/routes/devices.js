import {deviceData} from "../data/index.js";
import express from "express";

const router = express.Router();


router
.route("/")
.get(async (req, res) => {
  try {
    const device = await deviceData.getAllDevices();
    res.json(device);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router
.route("/:id")
.get(async (req, res) => {
    try {
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
})

export default router;