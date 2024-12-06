import mongoose from mongoose;
import { ObjectId } from "mongodb";

const preferenceSchema = new mongoose.Schema({
    deviceId: ObjectId,
    deviceSetting: String,
  });
  
const Preference = new mongoose.model("Preference", preferenceSchema);

export default Preference
