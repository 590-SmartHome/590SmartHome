import mongoose from mongoose;
import { ObjectId } from "mongodb";

const homeSchema = new mongoose.Schema({
    name: String,
    devices: Array[ObjectId],
  });
  
  module.exports = mongoose.model("home", homeSchema);