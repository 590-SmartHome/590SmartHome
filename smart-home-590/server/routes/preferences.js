import {preferenceData} from "../data/index.js";
import { validateId, validatePreference, validateUpdatePreference } from "../helpers/validation.js";

import express from "express";

const router = express.Router();


router
.route("/")
.get(async (req, res) => {
  try {
    const preferences = await preferenceData.getAllPreferences();
    res.status(200).json(preferences);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})
.post(async (req, res) => {
  let preference = req.body
  if (!preference || Object.keys(preference).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  try {
    preference = validatePreference(preference);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    preference = await preferenceData.createPreference(preference);
    res.status(200).json(preference);
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
    const preference = await preferenceData.getPreferenceById(req.params.id);
    return res.status(200).json(preference);
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
    const preference = await preferenceData.getPreferenceById(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  let updatePreference = req.body;
  if (!updatePreference || Object.keys(updatePreference).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  try {
    updatePreference = validateUpdatePreference(req.params.id, updatePreference);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    const preference = await preferenceData.updatePreference(updatePreference);
    res.status(200).json(preference);
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
    const preference = await preferenceData.getPreferenceById(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  try {
    const removedPreference = await preferenceData.deletePreference(req.params.id);
    return res.status(200).json({ _id: req.params.id, deleted: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});


export default router;