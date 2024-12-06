import {userData} from "../data/index.js";
import express from "express";
import { validateString, validateUser, validateId } from "../helpers/validation.js";

const router = express.Router();


router
.route("/")
.get(async (req, res) => {
  try {
    const users = await userData.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})
.post(async (req, res) => {
  let user = req.body
  if (!user || Object.keys(user).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  try {
    user = validateUser(user);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    user = await userData.createUser(user);
    res.status(200).json(user);
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
    const user = await userData.getUserById(req.params.id);
    return res.status(200).json(user);
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
    const user = await userData.getUserById(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  let updateUser = req.body;
  if (!updateUser || Object.keys(updateUser).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  try {
    updateUser = validateString(updateUser);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    user = await userData.updateUser(updateUser);
    res.status(200).json(user);
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
    const user = await userData.getUserById(req.params.id);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
  try {
    const removedUser = await userData.deleteUser(req.params.id);
    return res.status(200).json({ _id: req.params.id, deleted: true });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

export default router;