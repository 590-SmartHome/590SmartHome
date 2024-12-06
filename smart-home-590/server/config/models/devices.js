import mongoose from mongoose;

const deviceSchema = new mongoose.Schema({
    name: String,
    type: String,
    setting: String,
  });
  
const Device = new mongoose.model("device", deviceSchema);

export default Device