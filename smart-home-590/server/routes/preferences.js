import {preferenceData} from "../data/index.js";
import express from "express";

const router = express.Router();


router
.get("/", async (req, res) => {
  try {
    const preferences = await preferenceData.getAllPreferences();
    res.json(preferences);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;