import mongoose from mongoose;
import { ObjectId } from "mongodb";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    hashedPassword: String,
    avatarUrl: String,
    first_name: String,
    last_name: String,
    homes: Array[ObjectId],
    preferences: Array[ObjectId],
  });
  
  module.exports = mongoose.model("user", userSchema);