import mongoose from mongoose;

const deviceSchema = new mongoose.Schema({
    name: String,
    type: String,
    setting: String,
  });
  
  module.exports = mongoose.model("device", deviceSchema);