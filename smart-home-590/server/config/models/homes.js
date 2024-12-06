import mongoose from mongoose;
import { ObjectId } from "mongodb";

const homeSchema = new mongoose.Schema({
    name: String,
    homePassword: String,
    devices: Array[ObjectId],
    users: Array[ObjectId]
  });
  
const Home = new mongoose.model("home", homeSchema);

export default Home