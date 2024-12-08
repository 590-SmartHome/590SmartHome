import {userData} from "../data/index.js";
import express from "express";
import { validateUser, validateId, validateUpdateUser, validateLoginInfo } from "../helpers/validation.js";
const router = express.Router();

import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import * as dotenv from 'dotenv';
dotenv.config()

function verifyToken(request, response, next) {
  const authHeaders = request.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if(!token){
    return response.status(401).json({error: "Authentication token is missing"})
  }
  verify(token, process.env.SECRETKEY, (error, user) =>{
    if(error){
      return response.status(403).json({error: "Invalid token"})
    }
    request.body.user = user;
    next()
  })
}

router
.route("/")
.get(verifyToken, async (req, res) => {
  try {
    const users = await userData.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})
.post(verifyToken, async (req, res) => {
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
.get(verifyToken, async (req, res) => {
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
.put(verifyToken, async (req, res) => {
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
    updateUser = validateUpdateUser(updateUser);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    const user = await userData.updateUser(req.params.id, updateUser);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})
.delete(verifyToken, async (req, res) => {
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

router
.route("/login")
.post(async (req, res) => {
  let user = req.body
  if (!user || Object.keys(user).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  try {
    user = validateLoginInfo(user);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
  try {
    user = await userData.loginUser(user);
    console.log(process.env.SECRETKEY)
    const token = sign(user, process.env.SECRETKEY)
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})

export default router;