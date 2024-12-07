import {homeData} from "../data/index.js";
import {validateId, validateHome, validateUpdateHome } from "../helpers/validation.js";
import express from "express";

const router = express.Router();

router
.route("/")
.get(async (req, res) => {
  try {
    const homes = await homeData.getAllHomes();
    res.status(200).json(homes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})
.post(async (req, res) => {
  let home = req.body
  if (!home || Object.keys(home).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  try {
    home = validateHome(home);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    home = await homeData.createHome(home);
    res.status(200).json(home);
  } catch (e) {
    console.error(e);
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
    const home = await homeData.getHomeById(req.params.id);
    return res.status(200).json(home);
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
    const home = await homeData.getHomeById(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  let updateHome = req.body;
  if (!updateHome || Object.keys(updateHome).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  try {
    updateHome = validateUpdateHome(updateHome);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    const home = await homeData.updateHome(req.params.id, updateHome);
    res.status(200).json(home);
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
    const home = await homeData.getHomeById(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  try {
    const removedHome = await homeData.deleteHome(req.params.id);
    return res.status(200).json({ _id: req.params.id, deleted: true });
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
});


export default router;