import mongoose from mongoose;
import { ObjectId } from "mongodb";

const preferenceSchema = new mongoose.Schema({
    deviceId: ObjectId,
    deviceSetting: String,
  });
  
  module.exports = mongoose.model("preference", preferenceSchema);