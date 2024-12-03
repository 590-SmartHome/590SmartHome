import {homeData} from "../data/index.js";
import express from "express";

const router = express.Router();


router
.get("/", async (req, res) => {
  try {
    const homes = await homeData.getAllHomes();
    res.json(homes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;